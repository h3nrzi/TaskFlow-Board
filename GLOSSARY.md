# TaskFlow

Domain language for the approved TaskFlow product model.

## Language

**Account**:
The identity that owns a TaskFlow private workspace. Its identity remains the same when its display name or account email changes.
_Avoid_: Demo profile when referring to an authenticated account

**Display name**:
The editable name used to present an account, including its derived avatar initials.
_Avoid_: Account identity when referring to a display name

**Private workspace**:
The projects and tasks belonging to one account and visible only to that account. A shared or team workspace is a different product scope.
_Avoid_: Team workspace when referring to a private workspace

**Due date**:
The calendar day on which a task is due, without a time of day.
_Avoid_: Deadline timestamp

**Creation time**:
The instant at which a task or project was created.
_Avoid_: Creation date when an instant is intended

**Last update time**:
The instant at which a task was last updated.
_Avoid_: Update date when an instant is intended

**Assignee**:
An optional free-text label identifying whom a task is assigned to in the private-workspace MVP. It is distinct from authenticated account identity; account-linked assignment may be reconsidered with collaboration.
_Avoid_: Account identity when referring to an assignee label
