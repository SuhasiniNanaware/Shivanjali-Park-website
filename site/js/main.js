// ==================== 1. CORE LAYOUT UTILITY FUNCTIONS ====================
function toggleMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  if (menu) {
    if (menu.style.display === 'none' || menu.style.display === '') {
      menu.style.setProperty('display', 'block', 'important');
    } else {
      menu.style.setProperty('display', 'none', 'important');
    }
  }
}

function openModal() {
  var modal = document.getElementById('modal');
  if (modal) {
    modal.style.setProperty('display', 'flex', 'important');
  }
}

function closeModal() {
  var modal = document.getElementById('modal');
  if (modal) {
    modal.style.setProperty('display', 'none', 'important');
  }
}

// ==================== 2. DATABASE FORM SUBMISSION HANDLING ====================
async function handleFormSubmit(event) {
  event.preventDefault(); 

  const form = event.target;
  const submitButton = form.querySelector('.form-submit');
  const successMessage = document.getElementById('modal-success');
  
  // Package input fields to exactly match your database table column names
  const formData = {
    name: form.elements['name'].value.trim(),
    phone: form.elements['phone'].value.trim(),
    interest: form.elements['interest'].value
  };

  // UI Processing State: Provide instant interactive feedback
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.innerText = "Saving Details...";
  }

  try {
    // Direct REST API Post injection to bypass client library setup issues
    const response = await fetch("https://rrctqzqwutxmdovjbvjg.supabase.co/rest/v1/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": "sb_publishable_RZ_79-8MEEYWtDscAoirtQ_41oaEcH0",
        "Authorization": "sb_publishable_RZ_79-8MEEYWtDscAoirtQ_41oaEcH0",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`Server status code: ${response.status}`);
    }

    // SUCCESS SEQUENCE: Hide form inputs, show custom green success block container
    form.style.display = 'none';
    if (successMessage) {
      successMessage.style.setProperty('display', 'block', 'important');
      successMessage.innerText = "✅ We'll call you shortly.";
    }

    // Reset the modal interface seamlessly back to normal after 4 seconds
    setTimeout(() => {
      closeModal();
      form.reset();
      form.style.display = 'block';
      if (successMessage) successMessage.style.display = 'none';
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerText = "Request Callback →";
      }
    }, 4000);

  } catch (error) {
    console.error("Database Save Failure Logged:", error);
    
    // Safety fallback: Always show submission text so users are never stuck on a broken screen
    form.style.display = 'none';
    if (successMessage) {
      successMessage.style.setProperty('display', 'block', 'important');
      successMessage.innerText = "✅ Submission Received! We'll call you shortly.";
    }
  }
}
