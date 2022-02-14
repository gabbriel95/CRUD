const axios = require("axios").default;

export class Axios {
  static async getUsers() {
    const res = await axios.get("http://localhost:3001/users", {
      headers: { "Access-Control-Allow-Origin": "*", "api-key": "123" },
      mode: "no-cors",
    });

    return res.data;
  }

  static async createUser(user: any) {
    const res = await axios.post("http://localhost:3001/users", user, {
      headers: { "Access-Control-Allow-Origin": "*" },
      mode: "no-cors",
    });
    console.log(res);
    return res.data;
  }

  static async modifyUser(dni: number, user: any) {
    const res = await axios.put(
      `http://localhost:3001/users/${dni}`,
      dni,
      user,
      {
        headers: { "Access-Control-Allow-Origin": "*" },
        mode: "no-cors",
      }
    );

    return res.data;
  }

  static async delate(dni: number) {
    const res = await axios.delete(`http://localhost:3001/users/${dni}`, dni, {
      headers: { "Access-Control-Allow-Origin": "*" },
      mode: "no-cors",
    });
    return res.data;
  }
}
