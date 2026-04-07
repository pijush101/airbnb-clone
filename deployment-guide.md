# 🚀 Vercel Deployment Guide for Airbnb Clone

Deploying a full-stack App (React Frontend + Node.js Backend) on Vercel is easiest when split into two separate Vercel projects: one for the Backend and one for the Frontend. 

I've already added a `vercel.json` file to your `server/` folder to make it Vercel-ready. Here are the step-by-step instructions to get everything live!

---

## Step 1: Push Your Code to GitHub (If you haven't already)
Vercel integrates seamlessly with GitHub.
1. Go to [GitHub](https://github.com/) and create a new repository (e.g., `airbnb-clone`).
2. Push your entire local `g:\airbnb-website` folder to this new repository.

---

## Step 2: Deploy the Backend (Server)
We must deploy the backend first so you can get the live **API URL**, which the frontend will need.

1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New** > **Project** and select your `airbnb-clone` GitHub repository.
3. In the project configuration screen:
   - **Project Name:** `airbnb-backend`
   - **Framework Preset:** `Other`
   - **Root Directory:** Click "Edit" and choose `server`. (This is crucial!).
4. Expand the **Environment Variables** section and add all your keys from `server/.env`:
   - `MONGO_URL` (Your MongoDB connection string)
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `COOKIE_SECRET`
   - `CLIENT_URL` (Leave this blank for now, or put `*`. Once we deploy the frontend, you will update this).
5. Click **Deploy**.

> [!IMPORTANT]
> Once deployed, Vercel will give you a domain (e.g., `https://airbnb-backend-xxxx.vercel.app`). **Copy this URL**. You will need it for the Frontend!

---

## Step 3: Deploy the Frontend (Client)
1. Go back to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New** > **Project** and select the **same** `airbnb-clone` GitHub repository.
3. In the project configuration screen:
   - **Project Name:** `airbnb-frontend`
   - **Framework Preset:** `Vite` (Vercel should auto-detect this).
   - **Root Directory:** Click "Edit" and choose `client`. (Crucial!).
4. Expand the **Environment Variables** section:
   - Add a new variable named `VITE_API_URL`
   - Set the value to the **Backend URL** you got from Step 2 (e.g., `https://airbnb-backend-xxxx.vercel.app`). *Make sure there is no trailing slash.*
5. Click **Deploy**.

> [!IMPORTANT]
> Once the frontend is deployed, copy its URL (e.g., `https://airbnb-frontend-xxxx.vercel.app`). 

---

## Step 4: Final Connection Sync
Because of CORS (Cross-Origin Resource Sharing), your backend needs to explicitly allow your frontend domain to talk to it.

1. Go to your **Backend Project** on Vercel.
2. Navigate to **Settings** > **Environment Variables**.
3. Update the `CLIENT_URL` variable to be your newly deployed Frontend URL (e.g., `https://airbnb-frontend-xxxx.vercel.app`).
4. Click **Save**, and then go to **Deployments** and click **Redeploy** to apply the new environment variables.

---

🎉 **Congratulations! Your Airbnb Clone is now live.** 🎉
