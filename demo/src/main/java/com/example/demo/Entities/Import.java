package com.example.demo.Entities;

public class Import {

    String userBd;
    String passwdBd;
    String versBd;
    String sid;
    String cheminImport;
    String nomdump;
    String shema_anc;
    String Tablespace;


    public Import() {
    }

    public Import(String userBd, String passwdBd, String versBd, String sid, String cheminImport, String nomdump, String shema_anc, String tablespace) {
        this.userBd = userBd;
        this.passwdBd = passwdBd;
        this.versBd = versBd;
        this.sid = sid;
        this.cheminImport = cheminImport;
        this.nomdump = nomdump;
        this.shema_anc = shema_anc;
        Tablespace = tablespace;
    }

    public void setUserBd(String userBd) {
        this.userBd = userBd;
    }

    public void setPasswdBd(String passwdBd) {
        this.passwdBd = passwdBd;
    }

    public void setVersBd(String versBd) {
        this.versBd = versBd;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public void setCheminImport(String cheminImport) {
        this.cheminImport = cheminImport;
    }

    public void setNomdump(String nomdump) {
        this.nomdump = nomdump;
    }

    public void setShema_anc(String shema_anc) {
        this.shema_anc = shema_anc;
    }

    public void setTablespace(String tablespace) {
        Tablespace = tablespace;
    }

    public String getUserBd() {
        return userBd;
    }

    public String getPasswdBd() {
        return passwdBd;
    }

    public String getVersBd() {
        return versBd;
    }

    public String getSid() {
        return sid;
    }

    public String getCheminImport() {
        return cheminImport;
    }

    public String getNomdump() {
        return nomdump;
    }

    public String getShema_anc() {
        return shema_anc;
    }

    public String getTablespace() {
        return Tablespace;
    }
}
