import React from "react"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext"
import { AttendanceProvider } from "./contexts/AttendanceContext"
import { TeamProvider } from "./contexts/TeamContext"
import { MemberProvider } from "./contexts/MemberContext"
import { UserProvider } from "./contexts/UserContext"
import { ChatProvider } from "./contexts/ChatContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { HomePage, Login, Signup, PrivateRoute, ForgotPassword, UpdateProfile } from "./modules"

function App() {
  return (
    <Container fluid className="d-flex align-items-center justify-content-center p-0">
      <div className="w-100">
        <Router>
          <AuthProvider>
            <AttendanceProvider>
              <TeamProvider>
                <MemberProvider>
                  <UserProvider>
                    <ChatProvider>
                      <Switch>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <PrivateRoute path="/update-profile" component={UpdateProfile} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />
                        <Route path="/forgot-password" component={ForgotPassword} />
                      </Switch>
                    </ChatProvider>
                  </UserProvider>
                </MemberProvider>
              </TeamProvider>
            </AttendanceProvider>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App


