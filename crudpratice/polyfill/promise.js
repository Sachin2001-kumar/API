function fetchuser(id){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            if(id>0) resolve({id,name:"sachin"})
            else reject(new Error("Invalid ID"))
        }, 500);
    })
}

fetchuser(1).then(user=>console.log(user.name)).catch(err=>console.log("failed")).finally(()=>console.log("Done"))