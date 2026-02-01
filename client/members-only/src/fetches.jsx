export async function userFetch() {
  try {
    const response = await fetch("/api/user");
    if (response.ok) {
      const data = await response.json();
      console.log("returning user")
      return data;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function messagesFetch() {
    try{
        const response = await fetch("/api/messages");
        if(response.ok){
            const data = await response.json();
            console.log("returning messages")
            return data;
        }
    }catch(e){
        console.error(e);
    }
}