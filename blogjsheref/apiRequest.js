const apiRequest = async(api_url='', optionReq =null,errmsg=null)=>{
    try {
        const response =await fetch(api_url,optionReq);
        if(!response.ok) throw Error("please reload the page");
    } catch (error) {
        errmsg=error.message;
        console.log(errmsg)
        
    }finally
    {
    return errmsg;
    }

}

export default apiRequest;