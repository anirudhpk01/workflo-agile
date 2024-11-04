const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();
const port = 5001;
const { Pool } = require('pg');

//DATABASE SETUP WITH NEON POSTGRES ----------------------------------------------------------------
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER, // Use 'user' instead of 'username' for Pool config
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});
//-------------------------------------------------------------------------------------------------------




//------------------MIDDLE WARE SETUP--------------------------------------


const { JWT_SECRET } = require("./config")
const jwt = require('jsonwebtoken')



function authMiddleWare(req,res,next){

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(403).json({})

    }

    const token = authHeader.split(' ')[1]
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        //what should i check to put next
        req.user=decoded
        next()
        
    }catch(err){
        res.status(403).json({ message: "Some issue in JWT Authorization"})
        
    }


   

    
}
























//--------------------------------------------------------------
app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM playing_with_neon;');
    client.release(); // Release client after query

    res.json(result.rows); // Send database rows as JSON
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});


app.post('/api/login', async (req, res) => {
  const { usermail, password } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT pwd FROM users WHERE u_mail=$1', [usermail]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid Username' });
    }

    const pwd1 = result.rows[0].pwd; // Getting the password from the database
    if (pwd1 === password) {
      const token = jwt.sign({ usermail: usermail }, JWT_SECRET); // Generate a JWT
      return res.json({ token }); // Return the token
    } else {
      return res.status(401).json({ error: 'Invalid Password' });
    }

    client.release(); // Release the client after query
  } catch (err) {
    console.error("Error in connecting to DB in login page:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

  // Authenticate user (check in database)
  



//------------------------------DASHBOARD---------------------------------------

app.get('/api/dash', authMiddleWare, async (req, res) => {
  const usermail = req.user.usermail; // Assuming this is where you're getting usermail
  if (!usermail) {
      return res.status(404).json({ message: "User not found" });
  }
  //res.json({ usermail }); // Ensure you're returning usermail
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT u_name,u_id FROM users WHERE u_mail=$1', [usermail]);
    client.release();

    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found.' });
    }
    const temp= result.rows[0].u_id
    const res1= await client.query('select * from tasks where u_id=$1',[temp])
    const task= res1.rows
    const userName = result.rows[0].u_name; // Get the username from the result
    res.json({ userName,
      task
     }); // Respond with the username
} catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "Failed to fetch user data." });
}
});




//-----------------------------------------------------------






app.get('/api/teams', authMiddleWare, async (req, res) => {
  try {
    const usermail = req.user.usermail;
    if (!usermail) {
      return res.status(404).json({ message: "User not found" });
    }

    const client = await pool.connect();

    // Call the get_team_data procedure
    const result = await client.query("CALL gtd($1,NULL)", [usermail]);
    client.release();

    res.json(result.rows[0].result); // Send JSON response with team data
  } catch (err) {
    console.error("Error fetching team data:", err);
    res.status(500).json({ error: "Failed to fetch team data." });
  }
});









app.post('/api/submit', authMiddleWare, async (req, res) => {
  try {
      const usermail = req.user.usermail;
      const { dp,wp,sp } = req.body; // Get the count from the request body

      if (!usermail) {
          return res.status(404).json({ message: "User not found" });
      }

      const client = await pool.connect();

      // Get the user ID associated with the email
      const userResult = await client.query('SELECT u_id FROM users WHERE u_mail = $1', [usermail]);
      if (userResult.rows.length === 0) {
          client.release();
          return res.status(404).json({ message: "User not found" });
      }

      const userId = userResult.rows[0].u_id;
      //const currentProgress = await client.query('SELECT progress FROM user_progress WHERE u_id = $1', [userId]);
        // console.log('Before progress:', currentProgress.rows[0].progress);
        // console.log(count)
        // console.log(userId)
      // Update the user_progress table
      await client.query('UPDATE user_progress SET d_prog = $1 WHERE u_id = $2', [dp, userId]);
      await client.query('UPDATE user_progress SET w_prog = $1 WHERE u_id = $2', [wp, userId]);
      await client.query('UPDATE user_progress SET s_prog = $1 WHERE u_id = $2', [sp, userId]);

      //const nextProgress = await client.query('SELECT d_pro FROM user_progress WHERE u_id = $1', [userId]);
        console.log('Progress updated')
      client.release();

      res.status(200).json({ message: 'Count updated successfully' });
  } catch (err) {
      console.error("Error updating user progress:", err);
      res.status(500).json({ error: "Failed to update user progress." });
  }
});








// app.get('/api/teams', authMiddleWare, async (req, res) => {
//   try {
//     const usermail = req.user.usermail;
//     if (!usermail) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const client = await pool.connect();
//     const result = await client.query('SELECT u_name, u_id FROM users WHERE u_mail=$1', [usermail]);
//     client.release();

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'User not found.' });
//     }

//     const id = result.rows[0].u_id;
//     const res1 = await client.query('SELECT DISTINCT team_id FROM tasks WHERE u_id=$1', [id]);
//     const l1 = [...new Set(res1.rows.map(e => e.team_id.toUpperCase()))]; // Get unique team IDs

//     const r2 = await Promise.all(
//       l1.map(async (teamId) => {
//         // Fetch team details, role, project name, and supervisor name
//         const teamQuery = await client.query(`
//           SELECT t.*, ta.u_role, p.proj_name 
//           FROM team t 
//           JOIN tasks ta ON ta.team_id = t.team_id 
//           JOIN projects p ON t.proj_id = p.proj_id 
//           WHERE t.team_id = $1 AND ta.u_id = $2`, 
//           [teamId, id]
//         );

//         const teamData = teamQuery.rows[0]; // Team details

//         let supervisorName = null;
//         if (teamData && teamData.sc_uid) {
//           // Fetch the supervisor's name based on sc_uid
//           const supervisorQuery = await client.query('SELECT u_name FROM users WHERE u_id = $1', [teamData.sc_uid]);
//           if (supervisorQuery.rows.length > 0) {
//             supervisorName = supervisorQuery.rows[0].u_name;
//           }
//         }
//         const sc_res= await client.query(`select u_name from users where u_id = '${teamData.sc_uid}'`)

//         return {
//           team: teamData,  // Team details
//           role: teamQuery.rows.length > 0 ? teamData.u_role : null,  // User role if exists
//           proj_name: teamQuery.rows.length > 0 ? teamData.proj_name : null, // Project name if exists
//           supervisor_name: sc_res.rows[0].u_name // Supervisor's name
//         };
//       })
//     );

//     res.json(r2); // Respond with the array of team objects, their roles, project names, and supervisor names
//   } catch (err) {
//     console.error("Error fetching user data:", err);
//     res.status(500).json({ error: "Failed to fetch user data." });
//   }
// });




//-------------------------------------------------------------------------------------------------------------------







app.get('/api/lead', async (req, res) => {
  try {
    const client = await pool.connect();

    // Run the query to get user names and contrib indexes in descending order
    const result = await client.query(`
      SELECT u.u_name, up.contrib_index 
      FROM user_progress up
      JOIN users u ON u.u_id = up.u_id
      ORDER BY up.contrib_index DESC;
    `);

    client.release();

    // Map the results into the desired array of objects
    const leaderboard = result.rows.map(row => ({
      user_name: row.u_name,
      contrib_index: row.contrib_index
    }));
    console.log(leaderboard)
    res.json(leaderboard); // Return the leaderboard as JSON
  } catch (err) {
    console.error("Error fetching leaderboard data:", err);
    res.status(500).json({ error: "Failed to fetch leaderboard data." });
  }
});






app.get('/api/teamdet', authMiddleWare, async (req, res) => {
  try {
    const usermail = req.user.usermail;
    if (!usermail) {
      return res.status(404).json({ message: "User not found" });
    }

    const client = await pool.connect();
    
    // First, get the user ID from the users table
    const userResult = await client.query('SELECT u_id FROM users WHERE u_mail = $1', [usermail]);
    
    if (userResult.rows.length === 0) {
      client.release();
      return res.status(404).json({ message: 'User not found.' });
    }

    const userId = userResult.rows[0].u_id;

    // Now, find the distinct team IDs the user belongs to from the tasks table
    const teamResult = await client.query('SELECT DISTINCT team_id FROM tasks WHERE u_id = $1', [userId]);
    
    if (teamResult.rows.length === 0) {
      client.release();
      return res.status(404).json({ message: 'No teams found for this user.' });
    }

    // Collect all the team IDs
    const teamIds = teamResult.rows.map(row => row.team_id);

    // Fetch distinct user names belonging to the same teams
    const usernamesResult = await client.query(`
      SELECT DISTINCT u.u_name 
      FROM users u 
      JOIN tasks ta ON u.u_id = ta.u_id 
      WHERE ta.team_id = ANY($1::text[])
    `, [teamIds]);

    client.release();

    // Extract the usernames from the result
    const usernames = usernamesResult.rows.map(row => row.u_name);

    res.json(usernames); // Respond with the array of distinct usernames
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "Failed to fetch user data." });
  }
});



app.get('/api/scrum', authMiddleWare, async (req, res) => {
  const usermail = req.user.usermail;
  if (!usermail) {
      return res.status(404).json({ message: "User not found" });
  }

  try {
      const client = await pool.connect();

      // Step 1: Get the user ID
      const userResult = await client.query('SELECT u_id FROM users WHERE u_mail = $1', [usermail]);
      if (userResult.rows.length === 0) {
          return res.status(404).json({ message: 'User not found.' });
      }
      const userId = userResult.rows[0].u_id;
      console.log("User ID:", userId);

      // Step 2: Check if user has the "scrum" role
      const roleResult = await client.query('SELECT 1 FROM user_roles WHERE u_id = $1 AND role = $2', [userId, 'scrum']);
      if (roleResult.rows.length === 0) {
          client.release();
          return res.status(403).json({ message: "Access denied: User does not have scrum privileges." });
      }

      // Step 3: Get the team associated with this user
      const teamResult = await client.query(
          `SELECT team.team_id AS t
           FROM team
           JOIN tasks ON team.team_id = tasks.team_id
           WHERE team.sc_uid = $1 AND tasks.u_id = $2`,
          [userId, userId]
      );

      if (teamResult.rows.length === 0) {
          return res.status(404).json({ message: 'Team not found for this user.' });
      }
      console.log("Team Query Result:", teamResult.rows);
      const teamId = teamResult.rows[0].t;

      // Step 4: Fetch all tasks for this team, including u_name from users
      const taskResult = await client.query(
          `SELECT tasks.task_id, tasks.task_name, tasks.task_type, users.u_name AS u_name
           FROM tasks
           JOIN users ON tasks.u_id = users.u_id
           WHERE tasks.team_id = $1`,
          [teamId]
      );

      console.log("Tasks Query Result:", taskResult.rows);
      client.release();

      // Respond with the task information
      return res.json({ tasks: taskResult.rows });

  } catch (error) {
      console.error('Error fetching team tasks:', error);
      return res.status(500).json({ message: 'Server error' });
  }
});


app.listen(port, () => {
  console.log("Listening on port", port);
});
