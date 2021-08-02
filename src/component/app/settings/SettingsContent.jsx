import React, { useEffect, useState, useRef } from "react";
import { Switch, Route } from "react-router-dom";

import SettingsAccount from "./SettingsAccount"
import SettingsHabits from "./SettingsHabits"



function SettingsContent() {
  return (
    <div className="settings-content">
      <Route path="/app/settings/account" exact>
      <SettingsAccount/>
      </Route>
      <Route path="/app/settings/habits" exact>
        <SettingsHabits/>
      </Route>
    </div>
  );
}

export default SettingsContent;
