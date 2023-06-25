const form = document.getElementById('loginForm')

form.addEventListener('submit', async (event)=>{
    console.log('hollaaaa')
    event.preventDefault(); //Evitamos que, cuando el evento submit se lanze, recarguemos la página
    const data = new FormData(form); //Convertimos la info que nos llega, en data que si podamos usar
    const obj = {}
    data.forEach((value,key)=>(obj[key]=value))
    const response = await fetch('/api/sessions/login', {
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    console.log(response)
    const responseData = await response.json(); 
    console.log(responseData)
})