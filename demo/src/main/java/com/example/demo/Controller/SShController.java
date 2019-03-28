package com.example.demo.Controller;


import com.example.demo.DAO.SShDAO;
import com.example.demo.Entities.SSHConnection;
import com.jcraft.jsch.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;

@RestController
@CrossOrigin("*")
@RequestMapping("/ssh")
public class SShController {


    @Autowired
    private SShDAO sshDAO;
    private Session session;
    @RequestMapping(value = "", method = RequestMethod.POST)
    public SSHConnection saveSSH(@RequestBody SSHConnection c) {
        return sshDAO.saveSshConnection(c);
    }

    //connexion vers VM
    @RequestMapping(value = "/connect", method = RequestMethod.POST)
    public Session EtablirConn(@RequestBody SSHConnection c) {
        JSch jsch = new JSch();

        try {
            java.util.Properties config = new java.util.Properties();
            config.put("StrictHostKeyChecking", "no");
            this.session = jsch.getSession(c.getUser(), c.getHost(), 22);
            session.setPassword(c.getPassword());
            session.setConfig(config);
            session.connect();
            System.out.println("Connected");
            return session;
        } catch (JSchException e) {
          //  e.printStackTrace();
            System.out.println(" Non Connected");
            return null;
        }

    }

//Excution des commandes
    @RequestMapping(value = "/commande", method = RequestMethod.POST)
    public void ExcutionCommande(@RequestParam String commande) {
     try{
         Channel channel=session.openChannel("exec");
         ((ChannelExec)channel).setCommand(commande);
         channel.setInputStream(null);
         ((ChannelExec)channel).setErrStream(System.err);

         InputStream in=channel.getInputStream();
         channel.connect();
         byte[] tmp=new byte[4048];
         while(true){
             while(in.available()>0){
                 int i=in.read(tmp, 0, 4048);
                 if(i<0)break;
                 System.out.print(new String(tmp, 0, i));
             }
             if(channel.isClosed()){
                 System.out.println("exit-status: "+channel.getExitStatus());
                 break;
             }
             try{Thread.sleep(1000);}catch(Exception ee){}
         }
            }catch (Exception e) {
            e.printStackTrace();
        }



        }

 //copy fichier local vers server linux
    @RequestMapping(value = "/copy", method = RequestMethod.POST)
    public void copyfichier(String local,String host){


    }






    }

