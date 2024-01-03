function confirmDeleteApplicant(id){
    const ans=confirm('Are you sure you want to delete this job?');
    if(ans){
        window.location.href='/delete/'+id;
    }
}