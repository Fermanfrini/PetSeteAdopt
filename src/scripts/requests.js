import { toast, toastHome } from "./toast.js"
const baseUrl = 'https://m2-api-adot-pet.herokuapp.com'

import { getLocalStorage, setLocalStorage } from "./localStorage.js"

const login = async (body) => {
    try {
        const request = await fetch(baseUrl + '/session/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const res = await request.json()
        if (res.token) {
            setLocalStorage(res)
            toast("Sucesso!", "Login feito com sucesso")
            setTimeout(() => {
                window.location.replace("../../index.html")
            }, 4000);
        }
        else {
            toast("Erro!", "Senha ou email inválidos")
        }
        return res
    }
    catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

const createUser = async (body) => {
    try {
        const request = await fetch(baseUrl + '/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const res = await request.json()
        if (request.ok) {
            toast("Sucesso!", "Cadastro feito com sucesso.")
            setTimeout(() => {
                window.location.replace("../pages/login.html")
            }, 4000);
        } else {
            toast("Erro!", res.message)
        }

        return res
    } catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

const readAll = async () => {
    const token = getLocalStorage()
    const ul = document.querySelector('#card_list')
    const img = document.createElement('img')
    img.src = './src/imgs/catgit.gif'
    ul.appendChild(img)
    try {
        const request = await fetch(baseUrl + '/users', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },

        })
        const res = await request.json()
        return res
    } catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

const readProfile = async () => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/users/profile', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },

        })
        const res = await request.json()
        return res
    } catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

const updateProfile = async (body) => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/users/profile', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
            body: JSON.stringify(body)
        })
        const res = await request.json()
        if (request.ok) {
            toast("Sucesso!", "Perfil atualizado com sucesso")
            return res
        } else {
            toast('Erro!', 'Tente novamente')
        }
    } catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

const deleteProfile = async () => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/users/profile', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },

        })
        const res = await request.json()
        return res
    } catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

const createPet = async (body) => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/pets', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
            body: JSON.stringify(body)
        })
        const res = await request.json()
        if (request.ok) {
            toast("Sucesso!", "Novo pet criado com sucesso")
            return res
        } else {
            toast('Erro!', 'Tente novamente')
        }
    } catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

const readAllPets = async () => {
    try {
        const request = await fetch(baseUrl + '/pets', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        })
        const res = await request.json()
        return res
    } catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

const readAllMyPets = async () => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/pets/my_pets', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },

        })
        const res = await request.json()
        return res
    } catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

const updatePetById = async (body, petId) => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + `/pets/${petId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
            body: JSON.stringify(body)
        })
        const res = await request.json()
        if (request.ok) {
            toast("Sucesso!", "Pet atualizado com sucesso")
            return res
        } else {
            toast('Erro!', 'Tente novamente')
        }
    } catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

const deletePetById = async (petId) => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + `/pets/${petId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },

        })
        const res = await request.json()
        if (request.ok) {
            toast("Sucesso!", "Pet deletado com sucesso")
            return res
        } else {
            toast('Erro!', 'Tente novamente')
        }
    } catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

const createAdoption = async (body) => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/adoptions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
            body: JSON.stringify(body)
        })
        const res = await request.json()
        toastHome('Sucesso!', 'Parabéns pela adoção!')
        return res
    } catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

const readAllMyAdoptions = async () => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/adoptions', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },

        })
        const res = await request.json()
        return res
    } catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

const readAdoptionById = async (adoptionId) => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + `/adoptions/${adoptionId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },

        })
        const res = await request.json()
        return res
    } catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

const readmyAdoption = async () => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/adoptions/myAdoptions', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },

        })
        const res = await request.json()
        return res
    } catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

const updateAdoptionById = async (body, adoptionId) => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + `/adoptions/update/${adoptionId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
            body: JSON.stringify(body)
        })
        const res = await request.json()
        return res
    } catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

const deleteAdoptionById = async (adoptionId) => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + `/adoptions/delete/${adoptionId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
        })
        const res = await request.json()
        return res
    } catch (error) {
        toast("Erro!", 'Algo deu errado')
    }
}

export {
    login,
    createUser,
    readAll,
    readProfile,
    updateProfile,
    deleteProfile,
    createPet,
    readAllPets,
    readAllMyPets,
    updatePetById,
    deletePetById,
    createAdoption,
    readAllMyAdoptions,
    readAdoptionById,
    readmyAdoption,
    updateAdoptionById,
    deleteAdoptionById
}

