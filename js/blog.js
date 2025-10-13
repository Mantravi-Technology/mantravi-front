document.addEventListener('DOMContentLoaded', function () {
    loadBlogs();
});

function loadBlogs() {
    const token = 'token fd20fa89183b75e530029557dcc57976bb091a29';

    fetch('https://capstone.applicone.com/blog/getBlogList/', {  
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Network error: ' + response.status);
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('blog-container');
        container.innerHTML = '';

        const blogs = (data.results || []).sort((a, b) => new Date(b.date) - new Date(a.date)); 

        if (blogs.length === 0) {
            container.innerHTML = '<p>No blogs found.</p>';
            return;
        }

        blogs.forEach((blog, index) => {
            let imagesHTML = '';
            let hasImage = false;

            if (Array.isArray(blog.documents) && blog.documents.length > 0) {
                const defaultDocs = blog.documents.filter(doc => doc.is_default === true);

                if (defaultDocs.length > 0) {
                    defaultDocs.forEach(doc => {
                        const imageUrl = doc.file.startsWith('http') 
                            ? doc.file 
                            : `https://capstone-consultancy.s3.dualstack.ap-south-1.amazonaws.com/${doc.file}`;
                        imagesHTML += `<img src="${imageUrl}" alt="${doc.title || 'Blog Image'}" class="blog-image" />`;
                    });
                    hasImage = true;
                } else {
                    const firstDoc = blog.documents[0];
                    const imageUrl = firstDoc.file.startsWith('http')
                        ? firstDoc.file
                        : `https://capstone-consultancy.s3.dualstack.ap-south-1.amazonaws.com/${firstDoc.file}`;
                    imagesHTML = `<img src="${imageUrl}" alt="${firstDoc.title || 'Blog Image'}" class="blog-image" />`;
                    hasImage = true;
                }
            } else {
                imagesHTML = `<img src="images/black-logo.png" alt="placeholder image" class="blog-image" />`;
            } 

            const formattedDate = formatDate(blog.date);
            const blogTitle = blog.title || 'Untitled Blog';  
            const blogLink = `blog_detail.html?id=${blog.blog_id}`;

            const animationDelay = 0.3 + index * 0.2;

            const blogHTML = `
            <div class="col-md-4 wow fadeInUp animated" data-wow-delay="${animationDelay}s" style="visibility: visible; animation-delay: ${animationDelay}s; animation-name: fadeInUp;">
                <div class="news-box-items">
                    <div class="news-image">
                        ${imagesHTML}
                        ${imagesHTML}
                    </div>
                    <div class="news-content">
                        <ul class="comments-list">
                            <li><i>${formattedDate}</i></li>
                        </ul>
                        <h3>
                            <a href="${blogLink}">${blogTitle}</a>
                        </h3>
                        <a href="${blogLink}" class="link-btn">
                            Learn More
                            <span class="icon"><i class="lnr-icon-arrow-right"></i></span>
                        </a>
                    </div>
                </div>
            </div>
            `;

            container.insertAdjacentHTML('beforeend', blogHTML);
        });
    })
    .catch(error => {
        console.error('Error loading blogs:', error);
        const container = document.getElementById('blog-container');
        container.innerHTML = '<p>Failed to load blogs. Please try again later.</p>';
    });
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    if (isNaN(date)) return '';
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}








document.addEventListener('DOMContentLoaded', function () {
    const blogId = getBlogIdFromURL();

    console.log('[INFO] Extracted blogId from query param:', blogId);

    if (blogId) {
        loadBlogDetail(blogId);
    } else {
        console.error('[ERROR] No blog ID found in URL.');
        const container = document.getElementById('blog-detail-container');
        if (container) container.innerHTML = '<p>Invalid blog ID.</p>';
    }
});

function getBlogIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return (id && !isNaN(id)) ? id : null;
}

function loadBlogDetail(blogId) {
    const token = 'token fd20fa89183b75e530029557dcc57976bb091a29';

    console.log('[INFO] Fetching blog detail for ID:', blogId);

    fetch(`https://capstone.applicone.com/blog/getBlogDetail/${blogId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(response => {
        console.log('[INFO] Response status:', response.status);
        if (!response.ok) throw new Error('Network error: ' + response.status);
        return response.json();
    })
    .then(result => {
        console.log('[INFO] API response received:', result);
        if (!result.status || !result.data) {
            throw new Error("Invalid API response structure.");
        }

        const data = result.data;
        const container = document.getElementById('blog-detail-container');
        if (!container) {
            console.warn('[WARN] Blog detail container not found.');
            return;
        }

        const formattedDate = formatDate(data.date);

        let imageHTML = '';
        let galleryHTML = '';

        let defaultImage = null;
        let galleryImages = [];

        if (Array.isArray(data.documents) && data.documents.length > 0) {
            defaultImage = data.documents.find(doc => doc.is_default === true) || data.documents[0];
            galleryImages = data.documents.filter(doc => doc.doc_id !== defaultImage.doc_id);

            const mainImageUrl = defaultImage.file.startsWith('http')
                ? defaultImage.file
                : `https://capstone-consultancy.s3.dualstack.ap-south-1.amazonaws.com/${defaultImage.file}`;

            imageHTML = `<img src="${mainImageUrl}" alt="${defaultImage.title || 'Blog Image'}" class="blog-detail-image mb-4" style="max-width: 100%; height: auto;" />`;

            if (galleryImages.length > 0) {
                galleryHTML = `
                    <div class="row mb-4 gallery-images">
                        ${galleryImages.map(doc => {
                            const url = doc.file.startsWith('http')
                                ? doc.file
                                : `https://capstone-consultancy.s3.dualstack.ap-south-1.amazonaws.com/${doc.file}`;
                            return `
                                <div class="col-md-3 col-6 mb-3 text-center">
                                    <img src="${url}" alt="${doc.title || 'Gallery Image'}" class="img-fluid gallery-img" style="max-height: 150px; object-fit: cover;" />
                                </div>`;
                        }).join('')}
                    </div>
                `;
            }
        }

       
        const blogHTML = `
            <section class="product-details">
                <div class="container">
                    <div class="row">

                        <!-- Title and Meta -->
                        <div class="col-12">
                            <div class="product-details__top">
                                <h1 class="product-details__title mt-4 mb-2">
                                    ${data.title || 'Untitled Blog'}
                                </h1>
                                <p class="product-details__review mb-3">
                                    <span style="color: rgb(255, 65, 108);">
                                        ${formattedDate} | By ${data.created_by_name || '-'}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <!-- Main Image -->
                        ${imageHTML ? `
                        <div class="col-12 mb-4 text-center main-image">
                            ${imageHTML}
                        </div>` : ''}

                        <!-- Short Description -->
                        ${data.short_description ? `
                        <div class="col-12">
                            <p class="product-details__short-description mb-4">
                                ${data.short_description}
                            </p>
                        </div>` : ''}

                        <!-- Full Description -->
                        <div class="col-12">
                            <div class="product-details__content">
                                <div class="entry-content clear" data-ast-blocks-layout="true" itemprop="text">
                                    <div class="blog-description">
                                        ${data.description || ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Gallery Images After Description (No Title) -->
                        ${galleryHTML ? `
                        <div class="col-9 gallery-section mt-2">
                            ${galleryHTML}
                        </div>` : ''}

                    </div>
                </div>
            </section>
        `;

        container.innerHTML = blogHTML;

    })
    .catch(error => {
        console.error('[ERROR] Error loading blog detail:', error);
        const container = document.getElementById('blog-detail-container');
        if (container) container.innerHTML = '<p>Failed to load blog detail. Please try again later.</p>';
    });
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    if (isNaN(date)) return '';
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}





document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const messageDiv = document.getElementById('contact-message');
  const token = 'token fd20fa89183b75e530029557dcc57976bb091a29';

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
      title: formData.get('title'),
      email: formData.get('email') || null,
      phone: formData.get('phone') || null,
      description: formData.get('description') || null
    };

   
    if (!data.title) {
      messageDiv.textContent = 'Full Name (title) is required.';
      return;
    }

  
    if (!data.phone) {
      Swal.fire({
        icon: 'error',
        title: 'Phone Number Required',
        text: 'Please enter your phone number.',
      });
      return;
    }

    messageDiv.textContent = 'Submitting...';

    fetch('https://capstone.applicone.com/blog/postcontact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return response.json();
    })
    .then(result => {
      console.log('Success:', result);
   
      Swal.fire({
        icon: 'success',
        title: 'Contact Submitted',
        text: 'Thank you for your response! Your contact has been submitted.',
      }).then(() => {
        location.reload(); 
      });
      form.reset();
    })
    .catch(error => {
      console.error('Error:', error);
    
    });
  });
});

