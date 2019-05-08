#!/bin/sh
#-x
#Usage:

#scriptfile dump_location DB_Username password sid objet_name
export EXPDIR=$1
export DBUSERNAME=$2
export DBPASSWORD=$3
export ORACLE_SID=$4
export OBJET_NAME=$6
export VERS_BD=$7
export EXP_TYPE=$5
#export TFILE=`echo /tmp/nohup.$$.tmp`
export TFILE=nohup.$DBUSERNAME.out
export STARTTIME=`date`
export DATEFORMAT=`date +%Y%m%d_%Hh%Mm%Ss`
echo "version Bd :: "$VERS_BD > version.log
case $VERS_BD in
   12)
      export ORACLE_HOME="/oracle/product/12.2.0.1"
      echo "ORACLE_HOME :: "$ORACLE_HOME > version12.log
      ;;
   11)
      export ORACLE_HOME="/appli/oracle/product/11.2.0/dbhome_1"
      echo "ORACLE_HOME :: "$ORACLE_HOME > version11.log
      ;;
   autre)
   echo " avant chargement => ORACLE_HOME :: "$ORACLE_HOME > versionAutre.log
      . ~/.bash_profile
      cd ~
      echo " apres chargement => ORACLE_HOME :: "$ORACLE_HOME >> versionAutre.log
      ;;
esac




export EXPLOG=expdp_`echo $ORACLE_SID`_`echo $DATEFORMAT`.log
export PATH=$PATH:$ORACLE_HOME/bin
DUMPFILE=""
echo $PATH

if [[ $# -lt 7 ]] ; then
 echo "Wrong number of arguments... :: " $#
 echo "Usage:"
 echo "./export.sh dump_location DB_Username DB_Password DB_SID OBJET_Name EXP_TYPE"
 exit 0
fi
if [[ ! -d "${EXPDIR}" ]]; then
mkdir -p ${EXPDIR}
echo -e "`date` :${EXPDIR} Directory Created."
else
echo -e "`date` :${EXPDIR} directory found on system."
fi
if [ "$?" != 0 ]; then
echo "`date` :Command Failed To check ${EXPDIR} Properly"
exit 1
fi
echo "debut de creation....." > createDir.log
echo "user :: " $DBUSERNAME >> createDir.log
echo "pass :: " $DBPASSWORD >> createDir.log
echo "sid  :: " $ORACLE_SID >> createDir.log
sqlplus -L  $DBUSERNAME/$DBPASSWORD@$ORACLE_SID 2>> createDir.log  <<EOF
CREATE OR REPLACE DIRECTORY exp_dir AS '$EXPDIR';

EOF
echo "fin  de creation....." >> createDir.log

#    ================== SCHEMA EXPORT ==================
 if [ $EXP_TYPE = "Schema" ]
        then
echo "export shema" >> createDir.log
DUMPFILE=expdpSHEMA_`echo $ORACLE_SID`_`echo $DATEFORMAT`.dmp
echo $DUMPFILE >> createDir.log
expdp $DBUSERNAME/$DBPASSWORD@$ORACLE_SID schemas=$OBJET_NAME DIRECTORY=exp_dir DUMPFILE=expdpSHEMA_`echo $ORACLE_SID`_`echo $DATEFORMAT`.dmp LOGFILE=$EXPLOG > ${TFILE} 2>&1
       
 elif [ $EXP_TYPE = "Table" ]
       then
echo "export table"
DUMPFILE=expdpTABLE_`echo $ORACLE_SID`_`echo $DATEFORMAT`.dmp

#    ================== Table EXPORT ==================
nohup expdp $DBUSERNAME/$DBPASSWORD@$ORACLE_SID tables=$OBJET_NAME DIRECTORY=exp_dir DUMPFILE=expdpTABLE_`echo $ORACLE_SID`_`echo $DATEFORMAT`.dmp LOGFILE=$EXPLOG > ${TFILE} 2>&1 &

  elif [ $EXP_TYPE = "Full" ]
       then
echo "export ALL"
DUMPFILE=expdpFULL_`echo $ORACLE_SID`_`echo $DATEFORMAT`.dmp
#    ================== FULL EXPORT ==================
nohup expdp $DBUSERNAME/$DBPASSWORD@$ORACLE_SID DIRECTORY=exp_dir DUMPFILE=expdpFULL_`echo $ORACLE_SID`_`echo $DATEFORMAT`.dmp LOGFILE=$EXPLOG > ${TFILE} 2>&1 &
  
  else
         echo"erreur"
  fi

  #    ====================================

if [ -f "${EXPDIR}/${DUMPFILE}" ]; then
DUMPFILE=`basename $DUMPFILE .dmp`
tar -cvf ${EXPDIR}/$DUMPFILE.tar ${EXPDIR}/$DUMPFILE.dmp ${EXPDIR}/$EXPLOG
gzip ${EXPDIR}/$DUMPFILE.tar

fi
