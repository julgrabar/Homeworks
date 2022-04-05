let notes = [
{
    id: "1649080654369",
    name: "Shopping list",
    created: "April 20,2021",
    category: "Task", 
    content: "Tomatoes,Bread",
    dates: '',
    archived: false
},
{
  id: "1603480064369",
  name: 'The Theory of evolution',
  created: 'April 27, 2021',
  category: 'Random Thoughts',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus elit erat 28/9/2021, a vestibulum velit cursus sit amet. Fusce porttitor scelerisque mattis.',
  dates: '28/9/2021',
  archived: true,
},
{
  id: "1649080083069",
  name: 'New Feature',
  created: 'May 05, 2021',
  category: 'Idea',
  content:
    "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
  dates: '3/5/2021, 5/5/2021',
  archived: false,
},
{
  id: "1649080052969",
  name: 'William Gaddis',
  created: 'May 07, 2021',
  category: 'Quote',
  content:
    'Sed dapibus, nulla vitae consequat volutpat, libero velit pellentesque sapien 1/10/2021, vel consectetur elit tellus blandit neque.',
  dates: '1/10/2021',
  archived: false,
},
{
  id: "1649420064369",
  name: 'Radency',
  created: 'May 11, 2021',
  category: 'Idea',
  content:
    'Donec sit amet placerat enim. Ut gravida risus vel quam hendrerit vulputate. Etiam viverra laoreet justo, vitae bibendum justo vulputate sed. Nullam quis iaculis nunc.',
  dates: '',
  archived: true,
},
{
  id: "1649080069369",
  name: 'Purchases',
  created: 'May 13, 2021',
  category: 'Task',
  content:
    'Vestibulum libero risus, bibendum volutpat blandit placerat, convallis nec libero 11/10/2021. Nunc interdum consectetur sapien laoreet egestas 9/10/2021. Fusce at justo velit.',
  dates: '11/10/2021, 9/10/2021',
  archived: false,
},
{
  id: "1649990064369",
  name: 'Books',
  created: 'May 15, 2021',
  category: 'Task',
  content:
    'Donec sapien ligula, tempor vitae urna at, congue rutrum metus. Vestibulum quis elit purus. Integer a tellus sit amet sapien scelerisque scelerisque nec eu ante.',
  dates: '',
  archived: false,
},
];

let categories = {
    "Task": '<span class="material-icons">task_alt</span>',
    "Idea": '<span class="material-icons">tips_and_updates</span>',
    "Quote": '<span class="material-icons">format_quote</span>',
    "Random Thoughts": '<span class="material-icons">psychology</span>',

}

export {notes, categories};