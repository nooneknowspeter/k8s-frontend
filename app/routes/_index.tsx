
export const meta: MetaFunction = () => {
  return [
    { title: "K8s Microservices" },
    { name: "k8s-microservices", content: "K8s Microservices" },
  ];
};

const Index = () => {
  const getAllPlatforms = async () => {
    try {
      const request = await fetch(platformsProductionURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await request.json();

      const response = JSON.stringify(data);

      console.log(data);

      console.log(data[0]);

      console.log(response);

      console.log(request.status);

      if (!(data == "")) {
        setData(data)
      }
      else {
        setData("empty")
      }

      if (!(request.status == 200)) {
        setData("error")
        throw new Error(`Could Not Fetch Data From Server: ${request.status}`)
      }
    }
    catch (Error) {
      console.error(Error);
    }

  }

  const getAllCommands = async () => {
    try {
      const request = await fetch(commandsProductionURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await request.json();

      const response = JSON.stringify(data);

      console.log(data);

      console.log(response);

      console.log(request.status)

      if (!(data == "")) {
        setData(data)
      }
      else {
        setData("empty")
      }

      if (!(request.status == 200)) {
        setData("error")
        throw new Error(`Could Not Fetch Data From Server: ${request.status}`)
      }

    }
    catch (Error) {
      console.error(Error);
    }
  }

  return (
      </div>
  );
export default Index;
