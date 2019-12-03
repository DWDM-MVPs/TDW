module.exports = async function (app, minhas_notas) 
{
    //#region var
    var minhas_notas = [];
    var fs= require('fs');
    //#endregion

    await lerNotas();

    //#region get
    app.get('/:id', (req, res) => 
    {
        if (minhas_notas[(req.params.id)] != null) 
        {
            res.status(200).send("" + minhas_notas[req.params.id])
        }
        else 
        {
            return res.send("Erro")
        }
    });

    app.get("/", (res) =>
    {
        res.status(200).send(minhas_notas);
    });

    app.get("/:id", (req, res) => 
    {
        console.log("GET: " + req.params.id);
        var valor = minhas_notas[req.params.id];
        if (valor != null) 
        {
            res.status(200).send(String(minhas_notas[req.params.id]));
        }
        else 
        {
            res.status(404).send("REGISTO N ENCONTRADO");
        }
    });

    app.get('/:id',(req,res)=>
    {
        if(minhas_notas[(req.params.id)]!=null)
        {
            res.status(200).send(""+ minhas_notas[req.params.id]);
        }
        else
        {
            return res.status(200).send("erro");
        }
    });
    //#endregion


    app.post("/", (req, res) => 
    {
        if (req.body.nota != null) 
        {
            console.log("POST: " + req.body.nota);
            minhas_notas.push({
                nota: req.body.new_nota,
                codigo: req.body.new_cod,
                nome_disciplina: req.body.new_disciplina,
                nome_prof: req.body.new_prof, 
            });
            gravarNotas(minhas_notas);
            res.status(200).send("REGISTO ADICIONADO");
        }
        else 
        {
            res.status(400).send("ERRO");
        }
    });

    app.patch("/:id", (req, res) => 
    {
        if (req.params.id != null && req.body.nota != null) 
        {
            console.log("PATCH:" + req.params.id + " | " + req.body.nota);
            minhas_notas[req.params.id] = parseInt(req.body.nota);
            res.status(200).send("REGISTO ATUALIZADO");
        }
        else 
        {
            res.status(400).send("ERRO");
        }
    });

    app.delete('/:id', (req, res) => 
    {
        if (req.params.id != null) 
        {
            minhas_notas.splice(req.params.id);
        }
        else 
        {
            minhas_notas = null;
            res.status(200)
        }
    });

    //#region functions
    function gravarNotas(minhas_notas)
    {
        fs.writeFile("./shared/ficheiro_notas.txt"),minhas_notas,(err)=>
        {
            if(err != null)
            {
                console.log(err);
            }
            else
            {
                console.log("ESCRITA EXECUTADA COM SUCESSO");
            }
        }
    }

    function lerNotas()
    {
        fs.readFile('./shared/ficheiro_notas.txt', 'utf8', function (err, contents) 
        {
            if(!err)
            {
                minhas_notas = [contents.split(",")]
            }
            else
            {
                console.log(err);
            }
        });
    }
    //#endregion
}