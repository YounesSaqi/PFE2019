package com.example.demo.Controller;


import com.example.demo.DAO.SShDAO;
import com.example.demo.Entities.Commande;
import com.example.demo.Entities.SSHConnection;
import com.jcraft.jsch.*;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.Channel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;

@RestController
@CrossOrigin("*")
@RequestMapping("/ssh")
public class SShController {


    @Autowired
    private SShDAO sshDAO;
    private Session session;

    public SShController() {
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public SSHConnection saveSSH(@RequestBody SSHConnection c) {
        return sshDAO.saveSshConnection(c);
    }

    //connexion vers VM
    @RequestMapping(value = "/connect", method = RequestMethod.POST)
    public Session connect(@RequestBody SSHConnection c) throws JSchException {
        try {
            java.util.Properties config = new java.util.Properties();
            config.put("StrictHostKeyChecking", "no");
            JSch jsch = new JSch();

             session = jsch.getSession(c.getUser(), c.getHost(), 22);
            session.setPassword(c.getPassword());
            session.setConfig(config);
            session.connect();

           System.out.println("connect");
            return session;
        }catch(Exception e){
            System.out.println("Non Connected");

            return null;
        }
    }


    //Excution des commandes
   @RequestMapping(value = "/commande", method = RequestMethod.POST)
       public  Commande ExecuteCommande(@RequestBody Commande commande) {
           String CommandOutput = null;
           try {
               // System.out.println("Connected");
               Channel channel = session.openChannel("exec");
               ((ChannelExec)channel).setPty(true);
               InputStream in = channel.getInputStream();
               channel.setInputStream(null);
                ((ChannelExec) channel).setErrStream(System.err);

               ((ChannelExec) channel).setCommand(commande.getCommande());
               ((ChannelExec) channel).setErrStream(System.err);


               channel.connect();
               byte[] tmp = new byte[1024];
               while (true) {
                   while (in.available() > 0) {
                       int i = in.read(tmp, 0, 1024);

                       if (i < 0)
                           break;
                       // System.out.print(new String(tmp, 0, i));
                       CommandOutput = new String(tmp, 0, i);
                   }

                   if (channel.isClosed()) {
                       // System.out.println("exit-status: " +
                       // channel.getExitStatus());
                       break;
                   }
                   try {
                       Thread.sleep(1000);
                   } catch (Exception ee) {
                   }
               }
            //   channel.disconnect();
           //    session.disconnect();
               // System.out.println("DONE");

           } catch (Exception e) {
               e.printStackTrace();
           }
       commande.setCommande(CommandOutput);
       System.out.println(commande.getCommande());
           return commande;

       }


    //copy fichier local vers server linux
    @RequestMapping(value = "/copy", method = RequestMethod.POST)
    public void copyfichier(String local,String host){


    }






    }

