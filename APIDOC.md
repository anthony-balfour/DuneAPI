# Anthony Balfour CP4 API Documentation
This API can receive information from a "Contact Me" form which requires user information.
Also, this API contains information about the first 3 books of DUNE.

## Contact Me Form Submission
**Request Format:** / with POST paramters of `first-name` and `last-name` and `comments-questions` and
`email`

**Request Type:** POST

**Returned Data Format**: Plain Text

**Description:** If the required parameters of first-name, last-name, and email are given, a message
is returned to the user stating `Form submission successul!`. The `comments-questions`
parameter is optional. If the required parameters are not given, the endpoint returns an error
message stating `Form subsmission not successful. Missing a required field.`


**Example Request:** / with POST parameters of `first-name=Tal` and `last-name=Lecturer` and
`email=cse154@uw.edu` and `comments-questions=I like this class!`

**Example Response:**


```
Form submission successul!
```

Error Result:

```
Form subsmission not successful. Missing a required field.
```

**Error Handling:**
- Possible 400 (invalid request) errors (all plain text):
  - If not passed a given parameter out of firstName, lastName, and email, an error is returned with
  the message `Form subsmission not successful. Missing a required field.`

## Dune Book Synopsis*
**Request Format:** /dune/:title

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns JSON with the synopsis of the book specified with the :title parameter.
The three options are `dune` and `messiah` and `children`.

**Example Request:** /dune/dune

**Example Response:**

```json
{
  "synopsis": "DUNE: Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides,
    heir to a noble
    family tasked with ruling an inhospitable world where the only thing of value is the “spice”
    melange, a drug capable of extending life and enhancing consciousness. Coveted across the known
    universe, melange is a prize worth killing for....

    When House Atreides is betrayed, the destruction of Paul’s family will set the
    boy on a journey toward a destiny greater than he could ever have imagined.
    And as he evolves into the mysterious man known as Muad’Dib, he will bring to fruition
    humankind’s most ancient and unattainable dream."
}
```

**Error Handling:**
- Possible 500 errors (all plain text):
  - If something else goes wrong on the server, returns an error with the message: `Server error. Try again.`
