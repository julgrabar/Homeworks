let notes = [
{
    id: '1649080654369',
    name: 'Shopping list',
    created: 'April 20,2021',
    category: 'Task', 
    content: 'Tomatoes, Bread, Salt',
    dates: '',
    archived: false
},
{
  id: '1603480064369',
  name: 'The Theory of evolution',
  created: 'April 27, 2021',
  category: 'Random Thoughts',
  content: 'Lorem ipsum dolor sit, amet consectetur 28/9/2021 adipisicing elit. Ipsam fuga quia praesentium.',
  dates: '28/9/2021',
  archived: true,
},
{
  id: '1649080083069',
  name: 'New Feature',
  created: 'May 05, 2021',
  category: 'Idea',
  content: "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
  dates: '3/5/2021, 5/5/2021',
  archived: false,
},
{
  id: '1649080052969',
  name: 'William Gaddis',
  created: 'May 07, 2021',
  category: 'Quote',
  content:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam 1/10/2021 fuga quia praesentium.',
  dates: '1/10/2021',
  archived: false,
},
{
  id: '1649420064369',
  name: 'Socials',
  created: 'March 15, 2021',
  category: 'Idea',
  content:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam fuga quia praesentium.',
  dates: '',
  archived: true,
},
{
  id: '1649080069369',
  name: 'Birds',
  created: 'January 21, 2021',
  category: 'Task',
  content:
    'Lorem ipsum dolor sit, amet consectetur 11/10/2021 adipisicing elit. Ipsam fuga 9/10/2021 quia praesentium.',
  dates: '11/10/2021, 9/10/2021',
  archived: false,
},
{
  id: '1649990064369',
  name: 'Books',
  created: 'May 15, 2021',
  category: 'Task',
  content:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam fuga quia praesentium.',
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