# Power Oracle

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<title>KSEB Power Cut Oracle</title>

<style>
*{
    box-sizing:border-box;
    margin:0;
    padding:0;
    -webkit-tap-highlight-color:transparent;
}

:root{
    --bg:#07110d;
    --panel:#0c1c15;
    --line:#1d4d36;
    --green:#39ff88;
    --yellow:#ffe66d;
    --red:#ff5263;
    --text:#e8fff1;
}

html,body{
    width:100%;
    height:100%;
    overflow:hidden;
}

body{
    font-family:Arial,Helvetica,sans-serif;
    background:
        radial-gradient(
            circle at 50% 15%,
            #123b27 0,
            #07110d 48%,
            #020605 100%
        );
    color:var(--text);
}

button{
    font:inherit;
}

#app{
    height:100%;
    display:flex;
    flex-direction:column;
}

/* HEADER */
header{
    min-height:72px;
    padding:14px 18px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    border-bottom:1px solid var(--line);
    background:rgba(3,10,7,.82);
    backdrop-filter:blur(8px);
}

.brand{
    display:flex;
    align-items:center;
    gap:10px;
}

.logo{
    width:42px;
    height:42px;
    border:1px solid var(--green);
    border-radius:10px;
    display:grid;
    place-items:center;
    font-size:22px;
    box-shadow:0 0 18px #39ff8833;
}

.brand h1{
    font-size:17px;
    letter-spacing:1px;
}

.brand p{
    font-size:10px;
    color:#83a895;
    margin-top:3px;
}

.badge{
    font-size:10px;
    border:1px solid #286344;
    padding:6px 9px;
    border-radius:20px;
    color:var(--green);
}

/* MAIN */
main{
    flex:1;
    overflow-y:auto;
    padding:18px;
    display:flex;
    flex-direction:column;
    gap:14px;
}

/* HERO */
.hero{
    border:1px solid var(--line);
    border-radius:18px;
    padding:20px;
    background:linear-gradient(145deg,#10291c,#08150f);
    box-shadow:0 14px 35px #0008;
    position:relative;
    overflow:hidden;
}

.kicker{
    font-size:11px;
    letter-spacing:2px;
    color:#7ba58c;
}

.hero h2{
    font-size:26px;
    margin:8px 0;
}

.hero .sub{
    font-size:13px;
    color:#a8c4b3;
    line-height:1.5;
}

/* ORACLE */
.oracle{
    margin-top:18px;
    border:1px dashed #2c6749;
    border-radius:14px;
    padding:16px;
    text-align:center;
    background:#06110b;
}

.prediction{
    font-size:24px;
    font-weight:800;
    margin:7px 0;
    color:var(--green);
}

.small{
    font-size:11px;
    color:#779a87;
}

/* CARDS */
.grid{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:12px;
}

.card{
    border:1px solid var(--line);
    border-radius:15px;
    padding:15px;
    background:#091710;
    min-height:108px;
}

.card .icon{
    font-size:21px;
}

.card h3{
    font-size:13px;
    margin:9px 0 5px;
}

.card p{
    font-size:11px;
    color:#8eae9d;
    line-height:1.45;
}

.status{
    display:flex;
    align-items:center;
    gap:8px;
    font-size:13px;
    color:var(--green);
}

.dot{
    width:9px;
    height:9px;
    border-radius:50%;
    background:var(--green);
    box-shadow:0 0 10px var(--green);
}

/* BUTTONS */
.controls{
    display:flex;
    flex-direction:column;
    gap:10px;
}

.btn{
    width:100%;
    border:1px solid #2d754f;
    background:#0d281b;
    color:var(--green);
    padding:14px;
    border-radius:12px;
    font-weight:700;
    cursor:pointer;
    text-align:center;
    transition:transform .1s ease, background .15s ease;
}

.btn:active{
    transform:scale(.98);
}

footer{
    text-align:center;
    padding:10px;
    color:#587565;
    font-size:9px;
    border-top:1px solid #163424;
}

/* PURE UNANNOUNCED BLACKOUT */
#blackout{
    position:fixed;
    inset:0;
    background:#000;
    z-index:99999;
    display:none;
    cursor:pointer;
}

#blackout.dead{
    display:block;
}

/* SUBTLE HINT ON BLACKOUT AFTER A FEW SECONDS */
#blackoutMsg{
    position:absolute;
    bottom:20px;
    width:100%;
    text-align:center;
    font-size:10px;
    color:#222;
    letter-spacing:1px;
    user-select:none;
}

/* POWER RECOVERY ANIMATION */
.power-surge{
    animation:surgeFlicker 0.6s steps(2);
}

@keyframes surgeFlicker{
    0%{ filter:brightness(0); }
    20%{ filter:brightness(2.2); }
    40%{ filter:brightness(0.2); }
    60%{ filter:brightness(1.8); }
    80%{ filter:brightness(0.6); }
    100%{ filter:brightness(1); }
}








    


        


            

⚡


            


                

KSEB POWER CUT ORACLE


                

UNOFFICIAL • COMPLETELY UNRELIABLE


            


        


        

LIVE*


    



    
        


            

POWER FORECAST ENGINE v3.1


            

Will the power stay on?


            


                Our advanced prediction system has absolutely no idea. But it looks convincing.
            



            


                

CURRENT ORACLE VERDICT


                

ANALYSING...


                

Calculating confidence from vibes...


            


        



        


            


                

🔌


                

Grid Status


                


                    
                    Probably ON
                


            



            


                

🕐


                

Next Mystery Cut


                

Somewhere between now and later.


            



            


                

📊


                

Prediction Accuracy


                

87.3%*
*number invented by the app.


            



            


                

⚡


                

Voltage Stability


                

230V (Nominal)


            


        



        


            🔮 PREDICT AGAIN
        



        


            NOT AFFILIATED WITH KSEB • FOR ENTERTAINMENT / COLLEGE DEMO PURPOSES ONLY
        


    






    

⚡ (KSEB struck. Tap anywhere to check the fuse.)

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://power-oracle-charm.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4b562665-4b92-4527-8f70-3adba60ca124).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
