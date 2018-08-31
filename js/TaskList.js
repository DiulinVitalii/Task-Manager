class TaskList {
    constructor(tasksList){
        this.taskList = tasksList;
        this.row = document.querySelector('.row');
    }
    createTask(){
        const card = document.createElement('div');
        card.classList.add('col-2');
        card.innerHTML = `
        <div class="card">
             <div class="card-header"><h5 class="card-title"></h5></div>
             <div class="card-body"><p class="card-text"></p></div>
             <div class="card-footer">
                 <a href="#edit" class="card-link edit">Edit</a>
                 <a href="#delete" class="card-link delete">Delete</a>  
             </div>
         </div>
        `;
        return card;
    }
    drawTasks(){
        const taskSample = this.createTask();
        this.taskList.forEach(task => {
            const newTask = taskSample.cloneNode(true);
            newTask.firstElementChild.setAttribute('data-id', String(task.id));
            newTask.querySelector('.card-title').textContent = task.header;
            newTask.querySelector('.card-text').textContent = task.details.substr(0, 15);
            this.row.appendChild(newTask);
        });
        this.init();
    }
    init() {
        const deleteItem = document.querySelectorAll('.delete');
        const EditItem = document.querySelectorAll('.edit');
        const headerItem = document.querySelectorAll('.card-header .card-title');
        const modal = document.querySelector('.modal');
        EditItem.forEach(el => el.addEventListener('click', this.editItem.bind(this)));
        deleteItem.forEach(el => el.addEventListener('click', this.removeTask.bind(this)));
        headerItem.forEach(el => el.addEventListener('click', this.showDetails.bind(this)));
        modal.addEventListener('click', this.closeModal.bind(this));
    }
    removeTask(e){
        const task = e.target.closest('.col-2');
        if(task) task.remove();
    }
    editItem(e){
        const task = e.target.closest('.col-2');
        if(task){
            sessionStorage.setItem('taskId', String(task.firstElementChild.dataset.id));
        }
    }
    showDetails(e){
        if(e.target.classList.contains('card-title')){
            AjaxRequest.getTask()
                .then(task =>{
                    const form = document.querySelector('.modal form');
                    form.header.value = task.header;
                    form.details.value = task.details;
                    form.date.value = task.date;
                });
            document.querySelector('.modal').classList.toggle('d-block');
        }
    }
    closeModal(e){
        console.log(e.target);
        if(!e.target.closest('.card') || e.target.classList.contains('close'))
            e.target.closest('.modal').classList.toggle('d-block');
    }

}