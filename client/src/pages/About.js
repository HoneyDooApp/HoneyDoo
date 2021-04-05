import React, { Component } from "react";
import "./About.css"


function About() {

  return (
    <div class="About-body">
      <p>
        At HoneyDoo, we care about getting things done. You should too, especially getting household chores done. <br></br>HoneyDoo has created an awesome way to help assign chores around the house and allow families <br></br> to get on with getting things done. We do this by automating the assignment and tracking of chores in our HoneyDoo List <br></br>  that can easily be shared with household members.  It’s simple, decide who is the manager of members (MOM) <br></br> in your household and the MOM will set up the family in our multi-tenant database. Your data is secure <br></br> and no other households will have access to your household chore data, unless the MOM grants them secure <br></br> access through our chore portal.
Once a household is set up, the MOM can assign chores to each member <br></br> and set the priority of the chore using PeachPoints. PeachPoints dictate the priority <br></br> in which chores will display in the HoneyDoo List. Users can see what chores have been allocated to them and the entire <br></br> family will know who is doing what creating a sense of sibling fairness.<br></br>
This is only the beta version of HoneyDoo, but imagine some of our future enhancements including:
<br></br>
        <div class="aboutli">
          <span> <li> Ability to share or trade chores;</li>  </span>
          <span> <li> Ability to send gentle reminders each day instead of nagging; </li>  </span>
          <span> <li> Ability to view an individual’s HoneyDoo list;</li>  </span>
          <span> <li> Ability to auto schedule recurring chores;</li>  </span>
          <span> <li> Ability to rate the chore execution on a scale of 5 peaches and 5 pits.</li>  </span>
          <span> <li> So try HoneyDoo now and start getting stuff done!</li>  </span>
          <br></br>

Email us at <a href="mailto:HoneyDoo@honeydoo.com " target="_blank" rel="noreferrer"><strong>HoneyDoo@honeydoo.com </strong></a>
        </div>
      </p>

    </div>

  );
}


export default About;