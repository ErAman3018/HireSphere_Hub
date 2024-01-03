function confirmUpdate(id){
    const ans=confirm('Are you sure you want to update this job?');
    if(ans){
        window.location.href='/update/'+id;
    }
}