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

export async function messagesFetch(userID, is_member) {
  try {
    const response = await fetch(
      `/api/messages?userID=${userID ?? -1}&is_member=${is_member ?? false}`,
    );
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
    const response = await fetch("/api/auth/signOut");
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

export async function signUpFetch(data, setErrors) {
  try {
    const postSignUpResponse = await fetch("/api/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (postSignUpResponse.ok) {
      console.log("successful sign up");
      setErrors([]);
      return postSignUpResponse;
    } else {
      const json = await postSignUpResponse.json();
      setErrors(json.errors);
    }
  } catch (e) {
    console.error(e);
  }
}

export async function logInFetch(data) {
  try {
    const postLogInResponse = await fetch("/api/auth/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (postLogInResponse.ok) {
      return postLogInResponse;
    }
  } catch (e) {
    console.error(e);
  }
}

export async function postMessageFetch(userID, data) {
  try {
    const postMessageResponse = await fetch(`/api/messages/${userID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (postMessageResponse.ok) {
      return postMessageResponse;
    }
  } catch (e) {
    console.error(e);
  }
}
