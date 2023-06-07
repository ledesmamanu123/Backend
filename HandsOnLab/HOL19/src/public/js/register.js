const form = document.getElementById('registerForm')

form.addEventListener('submit', async (event)=>{
    event.preventDefault(); //Evitamos que, cuando el evento submit se lanze, recarguemos la página
    const data = new FormData(form); //Convertimos la info que nos llega, en data que si podamos usar
    const obj = {}
    data.forEach((value,key)=>(obj[key]=value))
    const response = await fetch('/api/sessions/register', {
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const responseData = await response.json();
    if(responseData.status === 'Success'){
        //Lo redirijo a login
        window.location.replace('/login')
    }
    console.log(responseData)
})