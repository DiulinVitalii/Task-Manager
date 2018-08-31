class Login{
    constructor(form) {
        this.form = form;
        this.controls = this.form.elements;
        Array.from(this.controls).forEach(el => el.addEventListener('blur', this.validate));
        this.form.addEventListener('submit', this.onsubmit.bind(this));
        if (document.forms[0].classList.contains('edit')) this.setForm();
    }

    validate(e) {
        if(e.target.tagName === 'BUTTON') return true;
        e.target.classList.remove('border-danger');

        if(!e.target.value) {
            e.target.classList.add('border-danger');
            return false;
        }

        const regexp = new RegExp(e.target.dataset.reg);
        if(!regexp.test(e.target.value)) {
            e.target.classList.add('border-danger');
            return false;
        }
        if(e.target.id === 'password-repeat') {
            const password = document.getElementById('password');
            if (e.target.value !== password.value) e.target.classList.add('border-danger');
            return false;
        }

        return true;
    }
    onsubmit(e) {
        e.preventDefault();
        const controls = Array.from(this.controls);
        controls.forEach(el => this.validate({ target: el }));
        const valid = controls.every(el => !el.classList.contains('border-danger'));
        if(valid) {
            if(this.form.classList.contains('login')){
                AjaxRequest.logIn(this.form.email.value, this.form.password.value);
                Login.btnToggle();
            }
            else if(this.form.classList.contains('signin')){
                AjaxRequest.signIn(this.form.email.value, this.form.password.value);
            }
            else if(this.form.classList.contains('addnew')){
                AjaxRequest.addNew(this.form.header.value, this.form.details.value, this.form.date.value);
            }
            else if(this.form.classList.contains('edit')){
                AjaxRequest.edit(this.form.header.value, this.form.details.value, this.form.date.value);
            }
        }
    }
    static btnToggle(){
        const buttons = document.querySelectorAll('a.btn');
        buttons.forEach((btn) => {
            btn.classList.toggle('active');
        });
    }
    setForm(){
        AjaxRequest.getTask()
            .then(task =>{
                this.form.header.value = task.header;
                this.form.details.value = task.details;
                this.form.date.value = (Date.now() - task.date) / 3600000;
            });
    }
}
let login;
