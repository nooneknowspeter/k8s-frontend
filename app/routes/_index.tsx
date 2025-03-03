import { json, LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import JSONPretty from 'react-json-pretty';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import getAllPlatforms from "~/getAllPlatforms";

export const meta: MetaFunction = () => {
  return [
    { title: "K8s Microservices" },
    { name: "k8s-microservices", content: "K8s Microservices" },
  ];
};

const platformFormSchema = z.object({
  name: z.string().min(2).max(50),
  publisher: z.string().min(2).max(50),
  cost: z.string().min(2).max(50),
})

const commandsFormSchema = z.object({
  howTo: z.string().min(2).max(50),
  commandLine: z.string().min(2).max(50),
})

const Index = () => {
  const [service, setService] = useState("")
  const [data, setData] = useState("")

  const platformsProductionURL = "http://platforms-clusterip-service:8080/api/platforms"
  const commandsProductionURL = "http://commands-clusterip-service:8080/api/commands/platforms"

  const platformsDevURL = "http://localhost:5044/api/platforms"
  const commandsDevURL = "http://localhost:5108/api/commands/platforms"

  const platformForm = useForm<z.infer<typeof platformFormSchema>>({
    resolver: zodResolver(platformFormSchema),
    defaultValues: {
      name: "",
      publisher: "",
      cost: "",
    },
  })

  const commandsForm = useForm<z.infer<typeof commandsFormSchema>>({
    resolver: zodResolver(commandsFormSchema),
    defaultValues: {
      howTo: "",
      commandLine: "",
    },
  })

  function plaformOnSubmit(values: z.infer<typeof platformFormSchema>) {
    console.log(values)

    fetch(platformsProductionURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    const platformFormSchema = z.object({
      name: z.string().min(2).max(50),
      publisher: z.string().min(2).max(50),
      cost: z.string().min(2).max(50),
    })
  }

  function commandsOnSubmit(values: z.infer<typeof commandsFormSchema>) {
    console.log(values)

    fetch(commandsProductionURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    const commandsFormSchema = z.object({
      howTo: z.string().min(2).max(50),
      commandLine: z.string().min(2).max(50),
    })
  }

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
    <>
      <div className="flex transition-all flex-row gap-28 justify-center place-items-center h-screen">
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

        <div className="flex transition-all flex-col gap-6 justify-center place-items-center">
          {service == "platform-service" ?
            <Form {...platformForm}>
              <form onSubmit={platformForm.handleSubmit(plaformOnSubmit)} className="space-y-8">
                {/* name */}
                <FormField
                  control={platformForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name of Platform</FormLabel>
                      <FormControl>
                        <Input placeholder="Terraform" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* publisher */}
                <FormField
                  control={platformForm.control}
                  name="publisher"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publisher</FormLabel>
                      <FormControl>
                        <Input placeholder="Hashicorp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* cost */}
                <FormField
                  control={platformForm.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost</FormLabel>
                      <FormControl>
                        <Input placeholder="Free" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* submit */}
                <Button type="submit" className="transition-all hover:animate-pulse">Create</Button>
              </form>
            </Form>
            :
            <></>
          }

          {service == "commands-service" ?
            <Form {...commandsForm}>
              <form onSubmit={commandsForm.handleSubmit(commandsOnSubmit)} className="space-y-8">
                {/* how to */}
                <FormField
                  control={commandsForm.control}
                  name="howTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How To</FormLabel>
                      <FormControl>
                        <Input placeholder="Build Docker Image" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* command line */}
                <FormField
                  control={commandsForm.control}
                  name="commandLine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Command Line</FormLabel>
                      <FormControl>
                        <Input placeholder="docker build -t <user/nameOfContainer> -f ./<dockerFileLocation>" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* submit */}
                <Button type="submit">Create</Button>
              </form>
            </Form>
            :
            <></>
          }
        </div>
      </div>

      {/* pretty print json */}
      {!(data == "") ?
        <div className="flex flex-col gap-6 transition-all justify-center place-items-center">
          {!(data == "empty") ?
            <>
              <h1>Requested Data</h1>
              <br />
              <JSONPretty id="json-pretty" data={data}></JSONPretty>
            </>
            :
            <>
              <h1>Received Empty Data</h1>
              <br />
            </>
          }
        </div >
        :
        <></>
      }
    </>
  );
};

export default Index;
