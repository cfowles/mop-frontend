There are 4 routes that comprise the create petition flow. Here are their stories.

# Entering petition info - create_start.html
[CreatePetition](https://github.com/MoveOnOrg/mop-frontend/blob/main/src/containers/create-petition.js) is the main container for this route.

The information for the petition being created is stored in the container's state while it is in progress and, when onSubmit happens, it is validated client-side and stored in the redux store for previewing.

## Choosing a target
In this step the user must choose at least one target for their petition.

### National & State
The national and state targets are fetched from the api in the [loadTargets action](https://github.com/MoveOnOrg/mop-frontend/blob/main/src/actions/createPetitionActions.js#L106). National targets are preloaded when PetitionTargets mounts (which happens right away), and state targets are loaded when the user chooses a state.

Potential targets are stored in redux, keyed by state (or one national key). When a request begins for a state's targets, we prepopulate the redux store with the statesetate, statehouse, and governor targets for that state, so those choices are displayed right away.

Selected targets are stored together, no matter the type, in the root CreatePetition container state along with the rest of the petition data (for easier submission).

They are passed into the relavent target component by sorting by type in [CreatePetitionTarget](https://github.com/MoveOnOrg/mop-frontend/blob/main/src/containers/create-petition-target.js)'s `getDeriviedStateFromProps()` (a fairly new react lifecycle method). This design choice makes the later step of revising or editing a petition easier by just initializing with one list of targets of any type.

This list of current targets is modified by the child target components calling the `onTargetAdd()` and `onTargetRemove()` methods that are passed down from CreatePetition as props.

### Custom
Custom targets work pretty similarly, except with user-input data instead of a target from the API.

The input states for the custom targets are stored in CreatePetition so we can just grab it when the user submits the form, since it hasn't been added to the `state.targets` at that time (unless they pressed "Add New Target").

# Previewing and launching the petition (and registering if needed) - create_preview.html
Previewing the petition is as simple as pulling it from the redux store and displaying it.

We also have to provide a user registration form if the user isn't authenticated. This is done by conditionally including [RegisterForm](https://github.com/MoveOnOrg/mop-frontend/blob/main/src/containers/register-form.js).

If the user is registered and logged in, we instead include [EditUserForm](https://github.com/MoveOnOrg/mop-frontend/blob/main/src/components/theme-legacy/edit-user-form.js) to handle editing of the zip code if the user doesn't have one, or just for launching the petition without registering.

When the user chooses to launch the petition, they click the submit button, which is contained in either the EditUserForm or RegisterForm. The RegisterForm container (which is the same one that is used on the actual register page) dispatches the [register action](https://github.com/MoveOnOrg/mop-frontend/blob/main/src/actions/accountActions.js#L24) (`POST /api/v1/user`) with a success callback set to the [submit petition action](https://github.com/MoveOnOrg/mop-frontend/blob/main/src/actions/createPetitionActions.js#L37) (`POST /api/v1/user/petitions.json`), so these two actions will happen in sequence.

In the case of the launch button for the EditUserForm (user is already logged in), it will call the [submit petition action](https://github.com/MoveOnOrg/mop-frontend/blob/main/src/actions/createPetitionActions.js#L37) directly, passing the user's new zip code, if needed.

# Revising the petition before launching - create_revise.html
In the preview step, the user can optionally choose to revise the petition. CreateRevise is simply a wrapper that provides an `initialPetition` to `CreatePetition` (the input step). So when they continue back to the preview step, the old petition in the redux store will be replaced.

# Launched petition thanks page - create_finished.html
The CreateFinished container is a wrapper around the Thanks container that is the same for signing a petition, except with some conditionals arond `isCreator`, which we pass in as true.
