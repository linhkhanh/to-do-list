# Set up

- Run `npm install` to install all dependencies
 
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

- This app is using Firebase and FireStore for backend and storing data.

- Deployed to Firebase, link app: `https://to-do-list-b.web.app/`

- Run `firebase deploy` to deploy app to Firebase

## Functionality

1. Add new task
- There is a "Add Task" button, will show a form to add new task
- There are 3 fields: title, description ans image
- Able to input text and image for task.
- A "Remove button" is visible when an images selected to remove image
- There is a "Cancle" button and "Ok" button for summiting data.

2. Edit/Delete task
- Double click a task to edit information of task.
- There is a "Delete" button to delete task
- Tasks can be able to drag and drop from a list to another.

## Design

- There are 3 collections: todo, inProgress and done.
- Data design:
```
interface Task {
    id?: string;
    title?: string;
    description?: string;
    image?: string;
}
```


