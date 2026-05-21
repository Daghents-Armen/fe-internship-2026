export function fetchUsers() {
    console.log("API CALL: fetchUsers started");
  
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("API RESPONSE received");
  
        resolve([
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
          { id: 3, name: "Charlie" }
        ]);
      }, 500);
    });
  }