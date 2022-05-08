import React, { useState } from 'react';
import Link from 'next/link';
import { isAuthorized } from '@/utils/auth0';
import ReactResizeDetector from 'react-resize-detector';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import ActiveLink from 'components/shared/ActiveLink'


const BsNavLink = props => {
  const { href, title, className="" } = props;
  return (
    <ActiveLink activeClassName="active" href={href}>
      <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
    </ActiveLink>
  )
}

const LoginLink = ()=>
 <a className='nav-link port-navbar-link' href="api/auth/login">Login</a>;

const LogoutLink = ()=>
  <BsNavLink 
    className='nav-link port-navbar-link' 
    href="/api/auth/logout" 
    title=" Logout" />
  //<a className='nav-link port-navbar-link' href="/api/auth/logout">Logout</a>;

const Header = ({user, loading, className}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);



  const AdminMenu = () =>{
    const [ isOpen, setIsOpen ] = useState(false)
    return(
      <Dropdown className="port-navbar-link port-dropdown-menu"
      nav
      isOpen={isOpen}
      toggle={ () => setIsOpen(!isOpen) }>
        <DropdownToggle className="port-dropdown-toggle" nav caret>
          Admin
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <BsNavLink 
            className="port-dropdown-item"  
            href="/portfolios/new" title="Create portfolio"
            />
          </DropdownItem>
          <DropdownItem>
            <BsNavLink 
            className="port-dropdown-item"  
            href="/blogs/editor" title="Create post"
            />
          </DropdownItem>
          <DropdownItem>
            <BsNavLink 
            className="port-dropdown-item"  
            href="/dashboard" title="Dashboard"
            />
          </DropdownItem>
        </DropdownMenu>

      </Dropdown>
    )
  }

  return (
    <ReactResizeDetector handleWidth>
      {({width}) =>
         <Navbar
         className={`port-navbar port-default  absolute ${className} ${width < 768 && isOpen ? 'is-open' : 'is-close'}`}
         dark
         expand="md">
         <div className='navbar-brand'>
       
           <Link href="/">
             <a className="port-navbar-brand">CLEMENT NDUONYI</a>
           </Link>
         </div>
         <NavbarToggler onClick={toggle} />
         <Collapse isOpen={isOpen} navbar>
           <Nav className="mr-auto" navbar>
             <NavItem className="port-navbar-item">
               <BsNavLink href="/" title="Home"/>
             </NavItem>
             <NavItem className="port-navbar-item">
               <BsNavLink href="/about" title="About"/>
             </NavItem>
             <NavItem className="port-navbar-item">
               <BsNavLink href="/portfolios" title="Portfolios"/>
             </NavItem>
             <NavItem className="port-navbar-item">
               <BsNavLink href="/blogs" title="Blog"/>
             </NavItem>
             <NavItem className="port-navbar-item">
               <BsNavLink href="/cv" title="Cv"/>
             </NavItem>
             {/*<NavItem className="port-navbar-item">
               <BsNavLink href="/portfolios/new" title="new"/>
             </NavItem>
             <NavItem className="port-navbar-item">
               <BsNavLink href="/secret" title="Secret"/>
             </NavItem>
             <NavItem className="port-navbar-item">
               <BsNavLink href="/secretssr" title="Secretssr"/>
             </NavItem>
             <NavItem className="port-navbar-item">
               <BsNavLink href="/onlyadmin" title="Admin"/>
             </NavItem>
             <NavItem className="port-navbar-item">
               <BsNavLink href="/onlyadminssr" title="Adminssr"/>
             </NavItem>*/}
             </Nav> 
           <Nav navbar>
             {!loading &&
               <>
                 {user &&
                 <>
                   { isAuthorized(user, 'admin') && <AdminMenu/> }
                   <NavItem className="port-navbar-item">
                     <LogoutLink />
                   </NavItem>
                 </>
                 }
               
                 {!user &&
                   <NavItem className="port-navbar-item">
                     <LoginLink />
                   </NavItem>
                 }
               </>
   
             }
           </Nav>
         </Collapse>
       </Navbar>
      }
    
  </ReactResizeDetector>
  );
}
  

   

export default Header;