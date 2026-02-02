export async function userFetch() {
  try {
    const response = await fetch("/api/user");
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function messagesFetch() {
  try {
    const response = await fetch("/api/messages");
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (e) {
    console.error(e);
  }
}

export async function anonymousMessagesFetch() {
  try {
    const response = await fetch("/api/messages/anonymous");
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (e) {
    console.error(e);
  }
}

export async function signOut() {
  try {
    const response = await fetch("api/auth/signOut");
    if (response.ok) {
      return true;
    } else return false;
  } catch (e) {
    console.error(e);
  }
}

export async function updateMemberToTrue(userID) {
  try {
    const response = await fetch(`/api/user/${userID}`, {
      method: "PUT",
    });
    if (response.ok) {
      console.log("successfully updated member");
      return true;
    } else return false;
  } catch (e) {
    console.error(e);
  }
}
