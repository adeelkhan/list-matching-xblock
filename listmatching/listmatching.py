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

    left_list = List(help="Left list items for the option list",
                     scope = Scope.content,
                     default = ['one', 'two', 'three', 'four'])

    right_list = List(help="Right list items for the option list",
                     scope=Scope.content,
                     default = [1, 2, 3, 4])

    match_question = Dict(help="Matching Questions",
                          scope=Scope.content,
                          default={
                              'left_list': [],
                              'right_list': [],
                          })

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

        self.match_question['left_list'] = self.left_list
        self.match_question['right_list'] = self.right_list

        print self.match_question

        frag = Fragment(template.render(Context({
            'left_list': self.left_list,
            'right_list': self.right_list,
        })))

        frag.add_css(self.resource_string("static/css/listmatching.css"))
        frag.add_javascript(self.resource_string("static/js/src/listmatching.js"))
        frag.initialize_js('ListMatchXBlock')
        return frag

    @XBlock.json_handler
    def check_match(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        assert data['hello'] == 'world'
        print data['hello']

        self.count += 1
        return {"count": self.count}

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
