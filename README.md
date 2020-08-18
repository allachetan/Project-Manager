# Project-Manager
Web app to manage and plan a project. It allows users to interactively break a project into parts and create tasks to complete. Demo it here: https://chetanalla.com/Project-Manager/

Usage:
- User registration is currently disabled. Users must either login or click demo. Changes in the demo are saved until logout or session end.
- The brown background is both draggable and zoomable if you have a mouse. There is a limit to how much a user can zoom in or out based on the amount of blocks the user has created. This is so the user doesn't get lost!
- Blocks can be dragged by long pressing. You must click on the block for more than 0.5 seconds for it to activate.
- You can create new blocks by clicking the + button on the block and dragging it to the desired location of your new block.
- You can add a connection to an exisiting block by draggin the + button over another block.
- When you click on a block (under 0.5 sec) it will open it showing the tasks for that block.
- Create new tasks by pressing the + button.
- Tasks are draggable and can be dragged from the categories.
- You can change the task name by clicking on the name text.
- You can also change the block name and description by clicking on their text.
- You can delete a block only in full view if it is not the main central block by pressing the delete button located next to the big red X. 

Installation & Run:
- The backend and the frontend are seperate.
- To install the backend: download its folder and if you are using eclipse simply import a maven project. Adjust the envrionment variables when running for the database. 
- For the frontend see the read me in its folder.
