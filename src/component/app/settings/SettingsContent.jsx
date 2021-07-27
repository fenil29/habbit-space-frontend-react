import React, { useEffect, useState, useRef } from "react";
import { Switch, Route } from "react-router-dom";

function SettingsContent() {
  return (
    <div className="settings-content">
      <Route path="/app/settings/account" exact>
        account
      </Route>
      <Route path="/app/settings/habits" exact>
        habits
      </Route>
    </div>
  );
}

export default SettingsContent;
