#!/bin/sh
#-x
#Usage:
#scriptfile dump_location DB_Username password sid schema_name
export USERB=$1
export PASSWORD=$2
ORACLE_SID=$3
export DATEFORMAT=`date +%Y%m%d_%Hh%Mm%Ss`
export ORACLE_SID
export ANCIEN_SHCEMA=$4
export ANCIEN_SPACE=$5
export CHEMIN=$6
export dump=$7
export VERS_BD=$8
export EXPLOG=Importmetadata_`echo $ORACLE_SID`_`echo $DATEFORMAT`.log


case $VERS_BD in
    12)
       export ORACLE_HOME="/oracle/product/12.2.0.1"
       echo "ORACLE_HOME :: "$ORACLE_HOME > version12.log
       ;;
    11)
       export ORACLE_HOME="/oracle/product/11.2.0.4_std"
       echo "ORACLE_HOME :: "$ORACLE_HOME > version11.log
       ;;
 autre)
    echo " avant chargement => ORACLE_HOME :: "$ORACLE_HOME > versionAutre.log
       . ~/.bash_profile
       cd ~
       echo " apres chargement => ORACLE_HOME :: "$ORACLE_HOME >> versionAutre.log

       ;;
 esac

export PATH=$PATH:$ORACLE_HOME/bin
echo $VERS_BD

#    ================== CREATION USER ==================
if [ $VERS_BD = 12 || $VERS_BD = 11 ]; then

sqlplus -L / as sysdba@$ORACLE_SID 2> createDir.log  <<EOF

CREATE USER $USERB   IDENTIFIED BY $PASSWORD   DEFAULT TABLESPACE DATADBS TEMPORARY TABLESPACE TEMP   PROFILE DEFAULT   ACCOUNT UNLOCK;
grant connect,resource,dba to $USERB;
create or replace directory IMPORT${ORACLE_SID}  as ${CHEMIN};
grant read,write on directory IMPORT_${ORACLE_SID} to $USERB;
EOF
else

sqlplus -L / as sysdba@$ORACLE_SID 2> createDir.log  <<EOF
CREATE USER $USERB   IDENTIFIED BY $PASSWORD PROFILE DEFAULT   ACCOUNT UNLOCK;
grant connect,resource,dba to $USERB;
create or replace directory IMPORT${ORACLE_SID}  as ${CHEMIN};
grant read,write on directory IMPORT_${ORACLE_SID} to $USERB;
EOF
fi


echo "fin  de creation....."

#    ================== IMPORT META_DATA ==================

if [ -z "$ANCIEN_SPACE"  ]
then
nohup impdp $USERB/$PASSWORD directory=IMPORT_${ORACLE_SID} content=metadata_only schemas=$ANCIEN_SHCEMA logfile=$EXPLOG dumpfile=$dump  remap_schema=$ANCIEN_SHCEMA:$USERB  &
else
nohup impdp $USERB/$PASSWORD directory=IMPORT_${ORACLE_SID} content=metadata_only schemas=$ANCIEN_SHCEMA logfile=$EXPLOG dumpfile=$dump  remap_schema=$ANCIEN_SHCEMA:$USERB  REMAP_TABLESPACE=$ANCIEN_SPACE:DATADBS  &
echo "fin  d'import metadata_only trigger et contraintes ..."
fi

#    ================== stockage  trigger et constraints ==================

sqlplus -L $USERB/$PASSWORD@$ORACLE_SID 2> createDir.log  <<EOF

create table constraints_save as (SELECT  c.CONSTRAINT_NAME FROM user_constraints c, user_tables t WHERE c.table_name = t.table_name AND c.status = 'DISABLED' and CONSTRAINT_TYPE='R');
create table triggers_save as select trigger_name from user_triggers where status='DISABLED';
EOF

echo "fin  de stockage trigger et contraintes ..."

