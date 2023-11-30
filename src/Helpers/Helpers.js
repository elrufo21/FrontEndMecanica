export const sendData = async (data, url, toggle, method) => {
  const result = JSON.stringify(data);
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: result,
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Datos del servidor:", responseData);
      if (toggle) {
        toggle();
      }
      return responseData; // Puedes devolver los datos si los necesitas
    } else {
      console.error(
        "Error en la solicitud:",
        response.status,
        response.statusText
      );
      throw new Error("Error en la solicitud");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getData = async (url, date) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (date) {
      data.map((d) => {
        const nwDate = new Date(d.creation_date);
        const year = nwDate.getFullYear();
        const month = (nwDate.getMonth() + 1).toString().padStart(2, "0"); // Asegura que el mes tenga 2 dígitos
        const day = nwDate.getDate().toString().padStart(2, "0"); // Asegura que el día tenga 2 dígitos
        d.creation_date = `${year}/${month}/${day}`;
      });
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDataById = async (url, id) => {
  try {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const handleFilter = (id, data) => {
  const filter = data.filter((d) => d.id === id);
  return filter;
};