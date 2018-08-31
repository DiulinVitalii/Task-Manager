class AjaxRequest {
    static getData(body, method, path, hash) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, path);
            xhr.withCredentials = true;
            xhr.onloadend = function () {
                if(xhr.status === 200){
                    if(hash) location.hash = hash;
                    resolve(xhr.responseText);
                }
            };
            xhr.onerror = function () {
                reject(xhr.status);
            };
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(body);
        });
    }
    static logIn(email, password){
        const body = JSON.stringify({
            email: email,
            password: password
        });
        this.getData(body, 'POST', 'http://localhost:8000/user/login', 'home')
            .then(id => {
                const userId = JSON.stringify({ user_id: id });
                sessionStorage.setItem('id', String(id));
                return this.getData(userId, 'POST', 'http://localhost:8000/task/all');
            })
            .then(tasks => {
                const drawTasks = new TaskList(JSON.parse(tasks));
                drawTasks.drawTasks();
            });
    }
    static signIn(email, password){
        const body = JSON.stringify({
            email: email,
            password: password
        });
        this.getData(body, 'POST', 'http://localhost:8000/user/register', 'login');
    }
    static logOut(){
        this.getData(null, 'GET', 'http://localhost:8000/user/logout')
            .then(() => {
                Login.btnToggle();
                sessionStorage.removeItem('id');
            });
    }
    static addNew(header, details, date){
        const userId = sessionStorage.getItem('id');
        date = String(Date.now());
        const body = JSON.stringify({
            user_id: userId,
            header: header,
            details: details,
            date: date,
        });
        this.getData(body, 'POST', 'http://localhost:8000/task/add', 'home')
            .then( () => {
                const id = JSON.stringify({user_id: userId});
                return this.getData(id, 'POST', 'http://localhost:8000/task/all');
            })
            .then((tasks) => {
                const taskList = new TaskList(JSON.parse(tasks));
                taskList.drawTasks();
            });
    }
    static edit(header, details, date){
        const userId = sessionStorage.getItem('id');
        const taskId = sessionStorage.getItem('taskId');
        date = String(Date.now());
        const body = JSON.stringify({
            user_id: userId,
            header: header,
            details: details,
            date: date,
        });
        this.getData(body, 'PUT', `http://localhost:8000/task/${taskId}`, 'home')
            .then(() =>{
                const id = JSON.stringify({user_id: userId});
                return this.getData(id, 'POST', 'http://localhost:8000/task/all');
            })
            .then((tasks) =>{
                const drawTasks = new TaskList(JSON.parse(tasks));
                drawTasks.drawTasks();
            });

    }
    static getTask(){
        const taskId = sessionStorage.getItem('taskId');
        return this.getData(null, 'GET', `http://localhost:8000/task/one/${taskId}`)
            .then((task) =>{
                return JSON.parse(task);
            });

    }
}