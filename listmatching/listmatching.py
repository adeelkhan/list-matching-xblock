"""This XBlock gives user match two list."""

import pkg_resources

from xblock.core import XBlock
from xblock.fields import Scope, String , Integer , List , Dict
from xblock.fragment import Fragment
from django.template import Template, Context , RequestContext
from random import shuffle


class ListMatchXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.


    left_list = List(help="items for <option> in left list",
                     scope=Scope.content,
                     )

    right_list = List(help="items for <option> in right list",
                      scope=Scope.content,
                     )

    right_order = List(help="items in right order for right list",
                       scope=Scope.content,
                       )


    match_list_question = Dict(help="Matching Questions",
                                scope=Scope.content,
                                default={
                                    'left_list': [],
                                    'right_list': [],
                                }
                            )

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the ListMatchXBlock, shown to students
        when viewing courses.
        """

        html = self.resource_string("static/html/listmatching.html")
        template = Template(html)

        shuffle(self.right_list)

        self.match_list_question['left_list'] = self.left_list
        self.match_list_question['right_list'] = self.right_list


        frag = Fragment(template.render(Context({
            'match_list_question': self.match_list_question
        })))

        frag.add_css(self.resource_string("static/css/listmatching.css"))
        frag.add_javascript(self.resource_string("static/js/src/listmatching.js"))
        frag.initialize_js('ListMatchXBlock')
        return frag

    @XBlock.json_handler
    def check_match(self, data, suffix=''):
        """
        An example handler, which test for matching of two list
        """

        if len(self.right_order) == len(data['options_order']) and \
                        self.right_order == data['options_order']:
            return {'answer': 'matched'}
        else:
            return {'answer': 'not_matched'}

    @XBlock.json_handler
    def add_list1(self, data, suffix=''):
        """
        An example handler, which test for matching of two list
        """

        self.left_list.append(data['option'])

    @XBlock.json_handler
    def add_list2(self, data, suffix=''):
        """
        An example handler, which test for matching of two list
        """

        self.right_list.append(data['option'])
        self.right_order.append(data['option'])


    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("ListMatchXBlock",
             """<listmatching/>
             """),
            ("Multiple ListMatchXBlock",
             """<vertical_demo>
                <listmatching/>
                <listmatching/>
                <listmatching/>
                </vertical_demo>
             """),
        ]
