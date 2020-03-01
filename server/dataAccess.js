
import Firebase from 'firebase';
import config from '../Config';

//Modal used for admin login/data upload
 
const DataAccess = () => {
   const getDefaultUserData = (userID) => {
      const totals = 
      {
        id: userID,
        dailyHoney: 5,
        dailyPoo: 3,
        totalHoney: 0,
        totalPoo: 0
      };

      return totals;
    }

    const getTotals = async (userID) => {
      var userRef = Firebase.database().ref(userID);
      var userData = await userRef.once('value');
      return userData.val();
    }

    const GetUserTotals = (userID) => {
      if (!Firebase.apps.length)
        Firebase.initializeApp(config);
        getTotals(userID).then(totals => {
          const userData = totals != null ? {...totals, id: userID} : getDefaultUserData();

          return userData;
        });    
    }

    const UpdateDailyHoney = (userID) => {
      if (!Firebase.apps.length)
        Firebase.initializeApp(config);

      getTotals(userID).then (totals => { 
        if (totals == null) {
          totals = getDefaultUserData(userID);
        }
          
        if (totals.dailyHoney > 0) {          
          Firebase.database().ref(totals.id).set({
            id: totals.id,
            dailyHoney: totals.dailyHoney - 1,
            dailyPoo: totals.dailyPoo,
            totalHoney: totals.totalHoney,
            totalPoo: totals.totalPoo
           });
        }});
    }
    
    const UpdateDailyPoo = (userID) => {
      if (!Firebase.apps.length)
        Firebase.initializeApp(config);

      getTotals(userID).then (totals => { 
        if (totals == null) {
          totals = getDefaultUserData(userID);
        }
        if (totals.dailyPoo > 0) {          
          Firebase.database().ref(totals.id).set({
            id: totals.id,
            dailyHoney: totals.dailyHoney,
            dailyPoo: totals.dailyPoo - 1,
            totalHoney: totals.totalHoney,
            totalPoo: totals.totalPoo
           });
      }});      
    }
    
    const UpdateTotalHoney = (userID) => {
      if (!Firebase.apps.length)
        Firebase.initializeApp(config);

      getTotals(userID).then (totals => {    
        if (totals == null) {
          totals = getDefaultUserData(userID);
        }   
        Firebase.database().ref(userID).set({
          id: totals.id,
          dailyHoney: totals.dailyHoney,
          dailyPoo: totals.dailyPoo,
          totalHoney: totals.totalHoney + 1,
          totalPoo: totals.totalPoo
          });
      });    
    }
    
    const UpdateTotalPoo = (userID) => {
      if (!Firebase.apps.length)
        Firebase.initializeApp(config);     
        
        getTotals(userID).then (totals => {  
          if (totals == null) {
            totals = getDefaultUserData(userID);
          } 
        Firebase.database().ref(totals.id).set({
          id: totals.id,
          dailyHoney: totals.dailyHoney,
          dailyPoo: totals.dailyPoo,
          totalHoney: totals.totalHoney,
          totalPoo: totals.totalPoo + 1
          });
        });
    }
}

export default DataAccess;
