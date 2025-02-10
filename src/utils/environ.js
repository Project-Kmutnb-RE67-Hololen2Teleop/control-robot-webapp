class Env_Self {
    constructor() {
      this.IP = "188.166.222.52";   // Default value for IP
      this.PORT_HTTPS = "12345";    // Default value for PORT
      this.PORT_HTTP = "54321"
    }
    setIP(NewIP){
        this.IP = NewIP ;
    }
  }
  
  export default Env_Self;
  