import { Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/landing/LandingPage';
import { CartPage } from './pages/cart/CartPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ActivationGoogleAccountPage } from './pages/ActivationGoogleAccountPage';
import { ChangePasswrodPage } from './pages/ChangePasswordPage';
import { ActivationAccountPage } from './pages/ActivationAccountPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { UserProfile } from './pages/profile/UserProfile';
import { OrderPage } from './pages/orders/OrderPage';
import { StaffPage } from './pages/staff/StaffPage';



function App() {
  return(
    <>
      <Routes>
        <Route path='/' element={ <LandingPage/> }/>
        <Route path='login/' element={ <LoginPage/> }/>
        <Route path='register/' element={ <RegisterPage/> }/>
        <Route path='auth' element={ <ActivationGoogleAccountPage/> }/>
        <Route path='activate/:uid/:token' element={ <ActivationAccountPage/> }/>
        <Route path='password/reset/confirm/:uid/:token' element={ <ChangePasswrodPage/> }/>
        <Route path='change-password' element={ <ForgotPasswordPage/> }/>
  
        <Route path='cart/' element={ <CartPage/> }/>
        <Route path='profile/' element={ <UserProfile/> }/>
        <Route path='orders/' element={ <OrderPage/> }/>
        <Route path='staff/' element={ <StaffPage/> }/>
      </Routes>
    </>
  );
}

export default App