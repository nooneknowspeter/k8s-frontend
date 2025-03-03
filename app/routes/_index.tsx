import { json, LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import getAllPlatforms from "~/getAllPlatforms";

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
        <div className="flex transition-all flex-col gap-6 justify-center place-items-center">
          {/* select theme */}
          {/* <TooltipProvider> */}
          {/*   <Tooltip> */}
          {/*     <TooltipTrigger> */}
          {/*       <ThemeSelect /> */}
          {/*     </TooltipTrigger> */}
          {/*     <TooltipContent> */}
          {/*       <p>Change theme</p> */}
          {/*     </TooltipContent> */}
          {/*   </Tooltip> */}
          {/* </TooltipProvider> */}

          {/* dropdown select with tooltip on hover */}
          {/* select service */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Select onValueChange={setService}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="platform-service">Platform Service</SelectItem>
                    <SelectItem value="commands-service">Commands Service</SelectItem>
                  </SelectContent>
                </Select >
              </TooltipTrigger>
              <TooltipContent>
                <p>Select a service</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {service == "platform-service" ? <Button variant="outline" onClick={getAllPlatforms}>Get All Platforms</Button> : <></>}

          {service == "commands-service" ? <Button variant="outline" onClick={getAllCommands}>Get All Commands</Button> : <></>}
        </div>

      </div>
  );
export default Index;
