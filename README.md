# MyReading

> Manage your reading list through the a convenient CLI tool.

## Get

> Get URL link(s)

```
myreading get [id]
```

Options

```
-p, --priority  Get links flagged as priority       [boolean] [default: false]
-a, --all       Get all links                       [boolean] [default: false]
-r, --recent    Get most recent links MAX=10             [number] [default: 3]
```
## Store 

> Store URL link

```
myreading store <link>
```

Options

```
-p, --priority  Set the link you want to store as a priority         [boolean] [default: false]
```
## Rm

> Remove URL link(s)

```
myreading rm [id]
```

Options
```
  -a, --all      Remove all links                           [boolean] [default: false]
  -r, --read     Remove all links that are marked as READ
```

## Read

> Set link's status to READ

```
myreading read <id>
```

