const mainContainer = document.querySelector('.main')


function printData(data){
    data.forEach((job) => {
        const jobCard = document.createElement('div')

        if (job.featured) {
            jobCard.className = 'jobLists feature'
        }else{
            jobCard.className = 'jobLists'
        }
        
        // creating jobDetails div 
        const jobDetails = document.createElement('div')
        jobDetails.className = 'jobDetails'

        // creating company Logo div
        const companyLogo = document.createElement('div')
        companyLogo.className = 'companyLogo'
        companyLogo.innerHTML = `<img src="${job.logo}">`
        jobDetails.appendChild(companyLogo)

        // creating jobinfo div
        const jobInfo = document.createElement('div')
        jobInfo.className = 'jobinfo'

        // creating companyName div
        const companyName = document.createElement('div')
        companyName.className = 'companyName'
        companyName.innerHTML = job.company
        jobInfo.appendChild(companyName)

        // creating jobTitle div
        const jobTitle = document.createElement('div')
        jobTitle.className = 'jobTitle'
        jobTitle.innerHTML = job.position
        jobInfo.appendChild(jobTitle)

        // creating jobtiming div
        const jobTiming = document.createElement('div')
        jobTiming.className = 'jobtiming'
        jobTiming.innerHTML = `<div>${job.postedAt}</div>
                                <div>${job.contract}</div>
                                <div>${job.location}</div>`
        jobInfo.appendChild(jobTiming)

        // creating features div
        const features = document.createElement('div')
        features.className = 'features'
        if (job.featured && job.new) {
            features.innerHTML = `<div class="featureNew">NEW!</div>
                              <div class="featureFeatured">FEATURED</div>`
        }else if(job.new){
            features.innerHTML = `<div class="featureNew">NEW!</div>`
        }
    
        jobInfo.appendChild(features)
        jobDetails.appendChild(jobInfo)


        // creating tags div
        const tags = document.createElement('div')
        tags.className = 'tags'
        tags.innerHTML = `<div class="tag">${job.role}</div>
                            <div class="tag">${job.level}</div>`

        const languages = job.languages
        languages.forEach((lang) =>{
            tags.innerHTML += `<div class="tag">${lang}</div>`
        })

        // creating hr 
        const hr = document.createElement('hr')

        

            jobCard.appendChild(jobDetails)
            jobCard.appendChild(hr)
            jobCard.appendChild(tags)
            mainContainer.appendChild(jobCard)
    })

    const tagContainer = document.querySelectorAll('.tags')
    tagContainer.forEach((tags) =>{
    tags.addEventListener('click', (e) =>{
        if (e.target.className = "tag") {
            selectPrint(e.target.textContent)
        }
    })
    })
}

let data = [];
fetch('data.json').then((res) => res.json())
.then((companyData) => {
    data = companyData
    printData(data)
})


// printing selected tag

function selectPrint(text){
    const headerFilter = document.getElementById('headerFilter')
    
    // creating filter div
    const filterCon = document.createElement('div')
    filterCon.className = "filter"

    // creating clear filter div
    const clearFilter = document.createElement('div')
    clearFilter.id = 'filterClear'
    clearFilter.textContent = 'clear'

    if (!document.getElementById('filterClear')) {
        headerFilter.appendChild(clearFilter)
    }

    // check the text is available in any filterCon and adding text in filterCon  
    const headerFilterChild = Array.from(headerFilter.children)
    let isAvailable = false

    headerFilterChild.forEach((child) =>{
        const childText = child.innerText.trim()
            if (child.id !== "filterClear") {
                
               if (childText === text) {
                isAvailable = true
                return
               }
                
            }
        })

        if (!isAvailable) {
            filterCon.innerHTML = `<div class="filterText">${text}</div>
                                     <div class="closeFilter"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg></div>`
               
            headerFilter.appendChild(filterCon)

        // calling filterData Function with Selected text
            filterData()
        }
    

    

    headerFilter.style.display = "flex"

        headerFilter.addEventListener('click', (e) =>{
            if (e.target.textContent == "clear") {
                headerFilter.innerHTML = ""
                headerFilter.style.display = "none"
                mainContainer.innerHTML = ""
                printData(data)
            }

            // let removeItem
            const clickedTagName = e.target.tagName
            if(clickedTagName == "svg"){
                removeFilter(e.target.parentElement.parentElement)
            }
            else if(clickedTagName == "path"){
                removeFilter(e.target.parentElement.parentElement.parentElement)
            }else if(e.target.className == "closeFilter"){
               removeFilter(e.target.parentElement)
            }
        })
}

function removeFilter(filterItem){
    filterItem.remove()
const filteritems = document.querySelectorAll('.filter')
        if(filteritems.length === 0){
            const headerFilter = document.getElementById('headerFilter')
            headerFilter.innerHTML = ""
            headerFilter.style.display = "none"
        }
        filterData()
}


// printing filtered data
function filterData() {
    const filterContainer = document.querySelectorAll('.filter')
    let filterTexts = []
    filterContainer.forEach((filter) =>{
      if (filter.id !== "filterClear") {
        filterTexts.push(filter.textContent.trim())
      }
    })

    const filteredData = data.filter((job) =>{
        const jobTags = [job.role, job.level, ...job.languages]
        return filterTexts.every((target) => jobTags.includes(target))
    })

  mainContainer.innerHTML = "";
  printData(filteredData);
}