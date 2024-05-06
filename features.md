### FEATURES CHECK

#### COMMON
  - Access Token Flow ✅
  - Refresh Token Flow

#### ADMIN ROLE
  - Auth
    - Sign in ✅
    - Sign out ✅
  - Management
    - Stats ✅

    - Users
      - Read
        - Show hide columns ✅
        - Filter data per page ✅
        - Pagination ✅
        - Search ✅
      - Create ✅
      - Update
        - Reset Password ✅
        - Change photo profile
        - Update rest data ✅
      - Delete
        - Delete one ✅
        - Delete many

    - Companies
      - Read
        - Show hide columns ✅
        - Filter data per page ✅
        - Pagination ✅
        - Search ✅
      - Create ✅
      - Update
        - Change company image ✅
        - Update rest data ✅
      - Delete
        - Delete one ✅
        - Delete many ✅

    - Job Categories
      - Read
        - Show hide columns ✅
        - Filter data per page ✅
        - Pagination ✅
        - Search ✅
      - Create ✅
      - Update ✅
      - Delete
        - Delete one ✅
        - Delete many ✅

    - Employer Requests
      - Read
        - Show hide columns ✅
        - Filter data per page ✅
        - Pagination ✅
        - Search ✅
      - Update
        - Accept one ✅
        - Accept all ✅

#### EMPLOYER ROLE
  - Auth
    - Sign in ✅
      - Prevent sign in if unverified, admin must accept the request ✅
    - Sign up ✅
      - Create employer account unverified by default ✅
    - Sign out ✅
  - Management
    - Stats ✅

    - This company management
      - Update company name
      - Change company image
      - Change company about

    - Applications
      - Read
        - Show hide columns ✅
        - Filter data per page ✅
        - Pagination ✅
        - Search ✅
      - Update
        - Change application status ✅

    - Job Posts
      - Read
        - Grid view ✅
          - Filter data per page ✅
          - Sorting ✅
          - Pagination ✅
          - Search ✅
        - Table view
          - Show hide columns
          - Filter data per page
          - Sorting
          - Pagination
          - Search
      - Create ✅
        - Create job post with selectable salary currency
      - Update
        - Toggle active non-active job
        - Update rest data ✅
      - Delete
        - Delete one ✅
        - Delete many

#### JOBSEEKER AND PUBLIC ROLE
  - Auth
    - Sign up ✅
    - Sign in ✅
    - Sign out ✅
  - Things this role can do
    - Job
      - Job Finding
        - Search ✅
        - Sort ✅
        - Filter by job category ✅
        - Pagination ✅
        - Filter data per page
      - Apply to a job ✅
      - Save a job ✅
      - Unsave a job ✅
      - See saved jobs ✅
      - See applied jobs along with their statuses ✅
      - Open a job detail
      - Open a company detail
    - Account
      - Password reset ✅
      - Change email ✅
      - Change name ✅
      - Change photo profile ✅

      - Profile
        - Update about me ✅
        - Job Experience
          - Get all ✅
          - Create ✅
          - Update ✅
          - Delete ✅
        - Education
          - Get all ✅
          - Create ✅
          - Update ✅
          - Delete ✅