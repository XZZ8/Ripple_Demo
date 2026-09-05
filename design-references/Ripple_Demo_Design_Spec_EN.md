# Ripple Demo Product and Interaction Design Specification

**Version:** 1.0  
**Platform:** Mobile app  
**Reference frame:** 390 × 844 pt  
**Core journey:** Discover an activity → Join → Enter the group chat → Meet offline

## 1. Product Definition

Ripple is an anonymous activity-based social app. It uses a user's contacts in the background to connect them with friends and friends of friends, while keeping all identities anonymous inside the product.

### Product principles

1. Contacts determine which activities a user may see. The interface never reveals relationship paths, mutual contacts, phone numbers, or real identities.
2. Every user appears under a system-generated anonymous name and avatar.
3. Activities show only a broad area, such as Melbourne CBD, Chinatown, or Fitzroy. Participants coordinate the exact meeting point inside the group chat.
4. Joining is immediate. Tapping **Join Activity** adds the user to the activity and opens its group chat without host approval.
5. All segmented tabs support both tapping and horizontal swiping.

## 2. Information Architecture

After registration, Ripple has three main navigation destinations:

| Main destination | Default section | Purpose |
|---|---|---|
| Discover | Poster Board | Browse activities, explore the map, and review joined activities |
| Create | New | Create a new activity or manage the user's existing posts |
| Chats | All Chats | View and open activity group conversations |

The bottom navigation contains **Discover**, **Create**, and **Chats**. It remains visible on the three main destinations and is hidden on detail, editor, and conversation screens.

## 3. Registration Flow

Registration contains five setup screens. The main Discover screen is the destination after registration, not a separate sixth setup screen.

### R1 — Phone Number and Verification

**Purpose**  
Verify that the phone number belongs to the user without adding another navigation step.

**Default state**

- Ripple logo and a short value statement
- Country/region code selector
- Phone number input
- Privacy statement link
- **Continue** button

**Verification state on the same screen**

- Masked phone number
- Six-digit verification code input
- Resend countdown
- **Verify** button
- Back button returning to phone entry

**Interactions**

| Control | Result |
|---|---|
| Country code | Opens the country/region selector |
| Continue | Validates the phone number and switches to the verification state |
| Send Again | Resends the code after the countdown |
| Verify | On success, opens R2 — Contacts Permission |
| Back | Returns from code entry to phone entry |

**Required states**

- Empty number
- Invalid number
- Sending code
- Incorrect code
- Expired code
- Verification successful

For the demo, the verification code may be fixed as `123456`.

### R2 — Contacts Permission

**Purpose**  
Explain why Ripple requires contacts before showing the system permission prompt.

**Content**

- Title: **Find your trusted circle**
- Explanation: contacts determine which activities the user can access
- Privacy reassurance: Ripple does not display names, phone numbers, mutual contacts, or relationship paths
- Simple privacy illustration

**Buttons**

| Button | Result |
|---|---|
| Allow Contacts | Opens the operating system's contacts permission prompt; approval opens R3 |
| Don't Allow | Opens R2-Denied |

### R2-Denied — Contacts Required

**Content**

- Title: **Contacts access is required**
- Message: **Ripple needs access to your contacts before you can use the app.**
- Supporting explanation that contacts are required for Ripple's core connection model

This is a blocking information screen containing the message only.

### R3 — Anonymous Identity

**Purpose**  
Let the user choose a system-generated anonymous identity.

**Content**

- Large anonymous avatar preview
- Generated anonymous name, for example **Blue Koala**
- Reassurance that the user's real identity will not appear in activities or chats

**Buttons and behavior**

| Button | Result |
|---|---|
| Change next to avatar | Generates a new avatar only |
| Change next to name | Generates a new anonymous name only |
| Continue | Saves the current identity and opens R4 |
| Back | Returns to R2 without displaying the system permission prompt again |

The selected avatar and name remain saved if the user moves backward and returns.

### R4 — Basic Information

**Purpose**  
Collect age information for eligibility and activity filtering.

**Content**

- Date of birth selector
- Gender selection:
  - Male
  - Female
  - Other / Prefer not to say
- Short explanation of how the information is used

**Buttons and behavior**

| Button | Result |
|---|---|
| Date of birth | Opens the date picker |
| Gender option | Selects one option |
| Continue | Validates the date and opens R5 |
| Back | Returns to R3 |

**Rules**

- The demo should use an 18+ eligibility rule.
- An underage date displays an eligibility message and prevents continuation.
- Gender must not control activity recommendations or bubble size.
- Age may only be used for eligibility and age-inappropriate activity filtering.

### R5 — Interest Bubbles

**Purpose**  
Give Ripple initial preference signals for the dynamic filters.

**Content**

- 10–14 selectable bubbles, such as Food, Live Music, Outdoors, Art, Sports, Games, Study, Markets, Coffee, and Movies
- Larger default bubbles represent broadly popular categories rather than gender-based predictions
- Selected bubbles show both a color change and a checkmark or outline

**Buttons and behavior**

| Control | Result |
|---|---|
| Interest bubble | Selects or deselects the interest |
| Skip | Saves no interests and opens Discover / Poster Board |
| Continue | Saves selected interests and opens Discover / Poster Board |
| Back | Returns to R4 |

Continue remains available when no bubbles are selected.

## 4. Discover

### Shared structure

The top segmented navigation contains:

- **Poster Board**
- **Map**
- **My Plans**

Users may switch by tapping or swiping horizontally. The active section must remain visually clear.

Poster Board and Map share a second filter row:

- **For You**
- Two dynamic interests, for example **Food** and **Outdoors**
- **Trending**
- **Explore**

The two dynamic filters are based on registration choices and later activity behavior. Before enough data exists, Ripple displays two general categories.

### D1 — Poster Board

**Purpose**  
Present activities as a scrollable digital community noticeboard.

**Content**

Each poster contains:

- Cover image
- Activity title
- Date and time
- Broad area
- Cost or cost range
- Joined count and capacity
- Anonymous host name and avatar

The visual direction may use layered paper, tape, pins, and slight depth inspired by a physical noticeboard. Text areas must remain horizontal and readable; decorative rotation should be subtle.

**Interactions**

| Interaction | Result |
|---|---|
| Scroll down | Loads additional posters continuously |
| Pull down at the top | Refreshes new activities |
| Tap a poster | Opens D2 — Activity Details |
| Tap a filter | Refreshes the poster feed |

**Required states**

- Initial loading skeleton
- Loading more
- Empty results
- Network error with Retry
- End of results
- Full activity
- Joined activity

### D2 — Activity Details

**Content**

- Large activity cover
- Activity title
- Date and time
- Broad area only
- Cost
- Joined count and capacity
- Full description
- Anonymous host avatar and name

The screen does not show an exact address, mutual contacts, relationship level, phone number, or real identity.

**Buttons and behavior**

| Button | Result |
|---|---|
| Back | Returns to the previous Poster Board, Map, or My Plans state |
| Join Activity | Immediately adds the user, increases the joined count, and opens M2 — Group Chat |
| Open Group | Replaces Join Activity after joining and opens M2 |
| Full | Disabled when capacity has been reached |
| Share | Visual-only in the initial demo |
| Report | Opens a report-reason sheet |
| Edit | Visible only to the host and opens C3 — Activity Editor |

### D3 — Map

**Purpose**  
Show nearby activities around the user's current area.

**Content**

- Map centered on the user's current location
- Activity markers representing broad areas rather than exact private locations
- Shared filter row
- Activity preview card appearing from the bottom after a marker is selected

Location permission is requested only when Map is opened for the first time, not during registration.

**Buttons and behavior**

| Control | Result |
|---|---|
| Current location | Recenters the map |
| Search This Area | Refreshes activities inside the visible map region |
| Filter chip | Updates visible markers |
| Activity marker | Opens the activity preview card |
| View Details | Opens D2 |
| Join Activity | Joins the activity and opens M2 |

If location access is unavailable, the map defaults to Melbourne CBD and allows the user to search or move the map manually.

### D4 — My Plans

**Purpose**  
Show activities the user has joined or created.

**Content**

- Monthly calendar
- Highlighted dates containing activities
- Activity cards below the calendar for the selected date
- Default selection on the nearest date containing an activity

**Buttons and behavior**

| Control | Result |
|---|---|
| Previous/next month | Changes the calendar month |
| Date | Updates the activity list below |
| Activity card | Opens D2 |
| Open Group | Opens M2 |
| Edit | Visible only to the host and opens C3 |

**Activity states**

- Upcoming
- Happening Now
- Ended
- Cancelled

The empty state includes **Find an Activity**, which switches to Poster Board.

## 5. Create

The top segmented navigation contains **New** and **My Posts**. It supports both tapping and horizontal swiping.

### C1 — New Activity

**Form content**

- Activity title
- Description of one to three sentences
- Category: Food, Outdoor, Creative, Games, and similar categories
- Date
- Time
- Area: broad areas such as CBD, Chinatown, or Fitzroy
- Capacity
- Cost: Free or an estimated range

The location field selects a broad area only. Participants coordinate the exact meeting point inside the group chat.

**Buttons and behavior**

| Button | Result |
|---|---|
| Cancel | If content exists, displays Save Draft, Discard, and Keep Editing |
| Category | Opens a single-select category sheet |
| Date | Opens the date picker |
| Time | Opens the time picker |
| Area | Opens the area selector |
| Minus / Plus | Decreases or increases capacity; minimum capacity is two |
| Free | Clears the cost range and marks the activity as free |
| Save Draft | Saves the form and opens C2 — My Posts |
| Generate Poster | Becomes available after required information is complete |
| Regenerate | Creates another poster variation |
| Change Image | Replaces the poster image |
| Preview | Opens a preview using the D2 layout |
| Publish Activity | Publishes the activity, creates its group, adds the host, and opens M2 |

**Poster behavior**

- The poster-generation section appears only after title, category, date, time, and area are complete.
- After generation, the poster appears below the form.
- Preview must be available before publishing.
- The generated visual must not introduce information that differs from the form.

**Validation**

- Required fields display a specific inline message when missing.
- The activity time cannot be in the past.
- Capacity cannot be below two.
- Cost must be Free or a valid numeric range.
- A disabled Publish button must be accompanied by visible validation guidance.

### C2 — My Posts

**Content**

- Two-column grid of activities created by the user
- Each card includes poster thumbnail, title, date, and status badge
- Filter row: All, Published, Drafts

**Statuses**

- Draft
- Published
- Ended
- Cancelled

**Buttons and behavior**

| Interaction | Result |
|---|---|
| Tap a Draft card | Opens C3 with the saved form values |
| Tap a Published card | Opens D2; Edit is available from the detail screen |
| Create Your First Activity | Empty-state button switching to New |

Critical actions must use visible buttons and must not depend only on long press or swipe gestures.

### C3 — Activity Editor

C3 uses the same structure as C1 and retains all previously entered values and the generated poster.

**Buttons and behavior**

| Button | Result |
|---|---|
| Save Changes | Saves the activity, returns to D2, and posts an update message in the group chat |
| Save Draft | Visible only for drafts |
| Preview | Shows the edited activity details |
| Delete Draft | Deletes a draft after confirmation |
| Cancel Activity | Cancels a published activity after confirmation and makes its chat read-only |

## 6. Chats

### M1 — Chat List

**Purpose**  
Display all activity group conversations using a familiar messaging-list structure.

**Content**

- Page title: **Chats**
- Optional filters: All, Unread, Hosting
- Conversations sorted by the latest message
- Each row contains:
  - Activity poster thumbnail
  - Activity title
  - Latest message preview
  - Message time
  - Unread count
  - Activity status when relevant

Every conversation represents an activity group. Ripple does not provide regular one-to-one chats.

**Buttons and behavior**

| Control | Result |
|---|---|
| Conversation row | Opens M2 — Group Chat |
| Unread | Shows conversations with unread messages |
| Hosting | Shows activities created by the user |

The empty state displays **Join an activity to start chatting**, which opens Discover.

Cancelled activities remain visible with a **Cancelled** label and reduced visual emphasis.

### M2 — Activity Group Chat

**Top bar**

- Back button
- Activity title
- Participant count
- More button

**Pinned activity card**

- Cover thumbnail
- Date
- Time
- Broad area
- Cost
- Joined count and capacity

Tapping the card opens D2 — Activity Details.

**Members and messages**

- Every member uses an anonymous avatar and anonymous name.
- The activity creator receives a **Host** label.
- Messages contain avatar, anonymous name, message content, and time.
- System messages announce members joining or leaving, time changes, and activity cancellation.
- Tapping a member displays only the anonymous name, Block, and Report.

**Suggested replies**

- I'm on my way
- I've arrived
- Running late
- Where should we meet?

**Input and actions**

| Control | Result |
|---|---|
| Message field | Enters a text message |
| Send | Sends the message |
| Image | Visual-only in the initial demo |
| More | Opens Activity Details, Leave Activity, and Report Activity |
| Edit Activity | Host-only action opening C3 |
| Cancel Activity | Host-only action requiring confirmation |

**Leaving and cancellation rules**

- Leave Activity requires confirmation.
- Leaving frees one place and removes the conversation from the user's chat list.
- Rejoining restores the previous group history.
- The host cannot leave without cancelling the activity.
- A cancelled activity remains visible as a read-only conversation.

## 7. Navigation Matrix

| From | Action | Destination |
|---|---|---|
| R1 Phone | Verification succeeds | R2 Contacts Permission |
| R2 Contacts Permission | Allow Contacts | R3 Anonymous Identity |
| R2 Contacts Permission | Don't Allow | R2-Denied |
| R3 Anonymous Identity | Continue | R4 Basic Information |
| R4 Basic Information | Continue | R5 Interest Bubbles |
| R5 Interest Bubbles | Skip or Continue | D1 Poster Board |
| D1 Poster Board | Tap poster | D2 Activity Details |
| D2 Activity Details | Join Activity | M2 Group Chat |
| D3 Map | Tap marker | Activity preview card |
| Map preview card | View Details | D2 Activity Details |
| D4 My Plans | Tap activity | D2 Activity Details |
| D4 or D2 | Host taps Edit | C3 Activity Editor |
| C1 New Activity | Publish Activity | M2 Group Chat |
| C2 My Posts | Tap draft | C3 Activity Editor |
| M1 Chat List | Tap conversation | M2 Group Chat |
| M2 Group Chat | Tap pinned activity card | D2 Activity Details |

## 8. Visual Design Specification

### Layout and spacing

- Horizontal page margin: 16 pt
- Spacing system: 8, 16, 24, and 32 pt
- Top navigation height: 56 pt
- Segmented tab height: 44 pt
- Filter chip height: 36 pt
- Primary button height: 52 pt
- Minimum touch target: 44 × 44 pt
- Bottom navigation: 64–72 pt plus device safe area

### Typography

- Page title: 28/34, Semibold
- Card title: 20/26, Semibold
- Body: 16/24, Regular
- Metadata: 13/18, Regular
- Button label: 16/20, Semibold

### Provisional color palette

- Ripple Blue: `#4F6BFF`
- Coral Accent: `#FF6B6B`
- Warm Paper Background: `#FFF9F2`
- Surface: `#FFFFFF`
- Primary Text: `#17171C`
- Secondary Text: `#686872`
- Success: `#218A5A`
- Error: `#C9362B`

Normal text must reach at least a 4.5:1 contrast ratio. Selection, error, and activity status must never be communicated by color alone.

### Component states

Every button requires:

- Default
- Pressed
- Disabled
- Loading

Every text field requires:

- Default
- Focused
- Filled
- Error

Activity cards require:

- Default
- Joined
- Full
- Cancelled

## 9. Demo Scope

### Must be interactive

- Phone entry and simulated verification
- Both contacts-permission choices
- Independent name and avatar regeneration
- Date of birth, gender, and interest selection
- Tap and swipe navigation between Poster Board, Map, and My Plans
- Poster details and Join Activity → Group Chat
- New Activity form, poster generation, preview, and publishing
- My Posts grid and Activity Editor
- Chat List and Group Chat
- At least one example each of empty, full, joined, and cancelled states

### May use simulated data

- SMS delivery
- Contacts matching
- Current location
- Map results
- Real-time messaging
- Poster generation
- Reporting backend

The demo must not contain a contacts relationship graph. Contacts are described only as the background mechanism controlling activity visibility.

## 10. Final Interaction Decisions

1. Registration uses five setup screens; Skip or Continue on the interest screen opens Discover directly.
2. Phone verification is a second state on the first screen rather than a separate page.
3. The denied-contacts page is a blocking message only and has no recovery buttons.
4. Gender does not determine activity interests or interest-bubble sizes.
5. Top-level segmented tabs support both tapping and horizontal swiping.
6. The Discover calendar section is named **My Plans**, replacing **Ongoing**.
7. The Create management section is named **My Posts**, replacing **Edit**.
8. Poster generation appears after the required form fields are complete.
9. A user reviews Activity Details before tapping Join; joining then opens the group chat immediately.
10. Chat-list entries represent activity groups rather than individual users.
