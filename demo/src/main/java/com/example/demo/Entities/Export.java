package com.example.demo.Entities;

public class Export {


    String instance;
    String user;
    String password;
    String database;
    String sid;
    String cheminExport;
    String typeExport;
    String typeBd;



    String nomObjetAexporter;
    String nomDump;


    public Export() {
    }

    public Export(String user,String password, String sid,String typeBd,String nomDump) {
        this.user=user;
        this.password=password;
this.typeBd=typeBd;
        this.sid=sid;
        this.nomDump=nomDump;
    }
    public Export(String user,String password, String instance,String database,String typeBd,String nomDump) {
        this.user=user;
        this.password=password;
        this.typeBd=typeBd;
        this.instance=instance;
        this.database=database;
        this.nomDump=nomDump;
    }



    public String getInstance() {
        return instance;
    }

    public void setInstance(String instance) {
        this.instance = instance;
    }

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public String getDatabase() {
        return database;
    }

    public void setDatabase(String database) {
        this.database = database;
    }

    public String getNomDump() {
        return nomDump;
    }

    public void setNomDump(String nomDump) {
        this.nomDump = nomDump;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTypeBd() {
        return typeBd;
    }

    public void setTypeBd(String typeBd) {
        this.typeBd = typeBd;
    }

    public String getTypeExport() {
        return typeExport;
    }

    public void setTypeExport(String typeExport) {
        this.typeExport = typeExport;
    }
    public String getCheminExport() {
        return cheminExport;
    }

    public void setCheminExport(String cheminExport) {
        this.cheminExport = cheminExport;
    }

    public String getNomObjetAexporter() {
        return nomObjetAexporter;
    }

    public void setNomObjetAexporter(String nomObjetAexporter) {
        this.nomObjetAexporter = nomObjetAexporter;
    }
}
