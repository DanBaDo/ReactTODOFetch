# Simple React TODO app syncing to backend over a fkng REST API

App provides a way for add and remove tasks in a list, keeping that synced in a backend by using a REST API.
Text interface. I like it.

## How ir works.

It uses useEffect for dong a initial backend to frontend synchornization.

Later, uses another useEffect instance, depending on frontend task state for keep local changes synchronized on backend.

tasksREST function gives some sugar over the JS fetch for this specific case. 

## Fkng REST API workaround.

Backend don't accept empty tasks lists for updates.

When removing tasks, remove in frontend and backend until last remaining task. For the las task, keep it in backend, marked as done, and hide it in frontend to avoid saving all trash os the universe in de backend.

Signon and signoff proccess have been completed out of app using Insomnia.