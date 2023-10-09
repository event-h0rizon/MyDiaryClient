import React from 'react'
import { Link } from 'react-router-dom'
import ui from '../assets/ui.png'
import notedata from '../assets/userdata.png'
import userdata from '../assets/notedata.png'



const Home = () => {
  
  return (
    <div>
  
    <main>

      <section class="text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">My Diary</h1>
            <p class="lead text-body-secondary">My Diary is a simple & secure online diary application. You can store your documents or any data, and you can access it from anywhere in the world.
            All your data is anonymous & encrypted, so only you have access to your data !! </p>
            <p>
              <Link to="/signup" class="btn btn-primary my-2 mx-2">Sign Up</Link>
              <Link to="/login" class="btn btn-secondary my-2">Login</Link>
            </p>
          </div>
        </div>
      </section>

      <div class="album bg-body-tertiary">
        <div class="container">

          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div class="col">
              <div class="card shadow-sm">
                <img src={ui} alt="" />
                <div class="card-body">
                  <p class="card-text">Simple and clean UI enables seamless viewing and updating or deleting of all your data. Minimal and Efficient design is the core principle behind MyDiary.</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="mx-auto text-primary">
                      Simple
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card shadow-sm">
              <img src={userdata} alt="" />
                <div class="card-body">
                  <p class="card-text">This is a overview of how your data is stored in our servers. Your password is end-to-end encrypted ! That means your data is safe, even if somebody has access to our database.</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div style={{color:'green'}} class="mx-auto">
                      Encrypted
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
            <div class="col">
              <div class="card shadow-sm">
              <img src={notedata} alt="" />
                <div class="card-body">
                  <p class="card-text">This is a overview of how your data is stored in our servers. All of your data is unmarked, that means it is completely anonymous !! Your data is completely encrypted & anonymous.</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="mx-auto text-danger">
                      Anonymous
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>

    <footer class="text-body-secondary py-5">
      <div class="container">
        <p class="float-end mb-1">
          <a href="#">Back to top</a>
        </p>
        <p class="mb-1"> © Karthik P. All rights reserved</p>
       
      </div>
    </footer>
    <script src="/docs/5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>




  </div>
  )
}

export default Home
